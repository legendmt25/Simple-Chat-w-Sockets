<template>
  <div :style="{ ...align }">
    {{ isMyMessage ? "You" : message.from.username }}: {{ message.data }}
  </div>
</template>

<script>
export default {
  props: {
    message: Object,
  },

  computed: {
    isMyMessage() {
      return this.message.from.username == sessionStorage.getItem("username");
    },
    align() {
      return {
        "align-self": this.isMyMessage ? "flex-end" : "flex-start",
      };
    },
  },
};
</script>
