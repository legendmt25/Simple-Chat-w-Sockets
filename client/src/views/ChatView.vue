<template>
  <div class="chatview">
    <h2>Chat:</h2>
    <div class="chat">
      <chat-message-single
        v-for="message in messages"
        :key="message"
        :message="message"
      ></chat-message-single>
    </div>
    <div class="form-group">
      <input
        type="text"
        placeholder="Insert message: "
        @keyup.enter="sendMessage"
        v-model="inputMessage"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import ChatMessageSingle from "@/components/ChatMessageSingle.vue";
const url = process.env.url || "localhost";
export default {
  name: "chatView",
  data() {
    return {
      socket: new WebSocket(`ws://${url}:4000/`),
      messages: [],
      inputMessage: "",
    };
  },
  methods: {
    sendMessage() {
      let message = {
        data: this.inputMessage,
        from: {
          username: sessionStorage.getItem("username"),
        },
      };
      this.socket.send(JSON.stringify(message));
      this.messages.push(message);
      this.inputMessage = '';
    },
  },
  beforeMount() {
    this.socket.addEventListener("message", async (event) => {
      const message = JSON.parse(await event.data.text());
      this.messages.push(message);
    });
  },
  async created() {
    this.messages = await fetch(`http://${url}:3000/messages`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
  },
  components: { ChatMessageSingle },
};
</script>

<style>
@media only screen and (min-width: 768px) {
  .chatview {
    width: 50% !important;
  }
}

.chat {
  display: flex;
  flex-direction: column;
}
.chatview {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
</style>
