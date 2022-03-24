<template>
  <div></div>
</template>

<script>
import { WebSocket,  } from "ws";
export default {
  name: "chatView",
  data() {
    return {
      socket: null,
    };
  },
  created() {
    console.log(new WebSocket("ws://localhost:4000"));
  },
};
</script>
