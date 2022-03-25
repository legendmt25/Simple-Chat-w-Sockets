<template>
  <div>
    <hello-world></hello-world>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'homeView',
  components: {
    HelloWorld,
  },
};
</script>
