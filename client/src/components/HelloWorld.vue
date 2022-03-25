<template>
  <div class="main">
    <label for="username">Enter your username: </label>
    <input id="username" v-model="username" @keyup.enter="joinChat" />
    <span style="font-size: x-small; color: gray; user-select: none"
      >This username will be displayed as your name in the chat</span
    >
    <button @click="joinChat">Join chat</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    joinChat() {
      if (!this.username || this.username == "") {
        return;
      }
      sessionStorage.setItem("username", this.username);
      this.$router.push("/chat");
    },
  },
  beforeCreate() {
    sessionStorage.clear();
  }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 2px;
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
