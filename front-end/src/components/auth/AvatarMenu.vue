<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar color="brown" size="42">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ getRole }}</h3>

              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="editUser">
                Edytuj konto
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="logout"> Wyloguj </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    user: {
      initials: "U",
    },
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
    editUser() {
      this.$router.push("/users/edit-account");
    },
  },
  computed: {
    getRole() {
      return this.$store.getters["role"];
    },
  },
};
</script>
