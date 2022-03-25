<template>
  <div>
    <span>Chat: </span>
    <div style="display: flex; flex-direction: column" ref="chat">
      <div
        v-for="message in messages"
        :key="message"
        :style="{
          'align-self': message.isMine ? 'flex-end' : 'flex-start',
        }"
      >
        <div>
          {{ message.data }}
        </div>
      </div>
    </div>
    <input type="text" @keyup.enter="sendMessage" v-model="inputMessage" />
    <button @click="sendMessage">message</button>
  </div>
</template>

<script>
export default {
  name: "chatView",
  data() {
    return {
      socket: new WebSocket("ws://localhost:4000/"),
      messages: [],
      inputMessage: "",
    };
  },
  methods: {
    sendMessage() {
      let message = { data: this.inputMessage };
      this.socket.send(JSON.stringify(message));
      this.messages.push({ ...message, isMine: true });
    },
  },
  beforeMount() {
    this.socket.addEventListener("message", async (event) => {
      const message = JSON.parse(await event.data.text());
      this.messages.push({ ...message, isMine: false });
    });
  },
  async created() {
    this.messages = await fetch("http://localhost:3000/messages", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
    console.log(this.messages);
  },
};
</script>
