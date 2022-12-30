<template>
  <div v-if="!isAdmin">
    <v-card class="mt-10" align="center" justify="center"
      >Czesc użytkowniku, aplikacja jest w trakcie rozwoju</v-card
    >
  </div>

  <div v-if="isAdmin">
    <div class="text-center">
      <users-table> </users-table>
    </div>
  </div>
</template>

<script>
import UsersTable from "../../components/users/UsersTable.vue";

export default {
  data() {
    return {
      page: 1,
    };
  },
  components: { UsersTable },
  computed: {
    isAdmin() {
      return this.$store.getters.role == "ADMIN" ? true : false;
    },
  },
};
</script>
