<template>
  <v-app :dark="isDark">
    <v-app-bar>
      <v-spacer></v-spacer>

      <v-btn v-if="isAuthenticated" @click="logout">Wyloguj</v-btn>

      <v-btn
        :prepend-icon="isDark == 0 ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="toggleTheme"
        >Zmień Tryb</v-btn
      >
    </v-app-bar>

    <v-main>
      <router-view v-slot="slotProps">
        <component :is="slotProps.Component"></component>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      isDark: true,
    };
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      this.isDark == 1
        ? (this.$vuetify.theme.global.name = "dark")
        : (this.$vuetify.theme.global.name = "light");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
    isAuthenticated() {
      return this.$store.getters["isAuthenticated"];
    },
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/login");
      }
    },
  },
};
</script>
