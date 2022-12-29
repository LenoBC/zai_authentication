<template>
  <div v-if="!isAdmin">
    <v-card class="mt-10" align="center" justify="center"
      >Czesc użytkowniku, aplikacja jest w trakcie rozwoju</v-card
    >
  </div>

  <div v-if="isAdmin">
    <div class="text-center">
      <v-pagination class="mt-5" v-model="page" :length="4" rounded="circle"></v-pagination>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
    };
  },
  components: {},
  computed: {
    isAdmin() {
      return this.$store.getters.role == "ADMIN" ? true : false;
    },
  },
};
</script>
