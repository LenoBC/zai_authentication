<template>
  <div v-if="!isAdmin">
    <h1>"Hello User"</h1>
  </div>

  <div v-if="isAdmin">
    <h1>"Hello Admin op"</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isAdmin() {
      return this.$store.getters.role == "ADMIN" ? true : false;
    },
  },
};
</script>
