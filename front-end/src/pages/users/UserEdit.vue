<template>
  <user-edit-form
    v-if="getUser"
    @save-user-data="saveEditedUser"
    :firstName2="getUser.firstName"
    :lastName2="getUser.lastName"
    :phoneNumber2="getUser.phoneNumber"
    :birthday2="getUser.birthday"
    :email2="getUser.email"
  >
    <v-alert
      closable
      type="error"
      v-if="error"
      title="Błąd"
      :text="error"
      @click="handleError"
    ></v-alert>
  </user-edit-form>
</template>

<script>
import UserEditForm from "../../components/users/UserEditForm.vue";

export default {
  data() {
    return {
      error: null,
    };
  },
  components: {
    UserEditForm,
  },
  created() {
    this.loadUserDetails();
  },
  methods: {
    async loadUserDetails() {
      try {
        await this.$store.dispatch("users/loadUserDetails");
      } catch (error) {
        this.error = "Nie udało się pobrać danych o użytkowniku";
      }
    },
    async saveEditedUser(data) {
      try {
        await this.$store.dispatch("users/updateUser", data);
        this.$router.replace("/users");
      } catch (error) {
        this.error = "Aktualizacja danych nie powiodła się";
      }
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    getUser() {
      return this.$store.getters["users/user"];
    },
  },
};
</script>
