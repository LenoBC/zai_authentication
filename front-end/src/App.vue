<template>
  <v-app :dark="isDark">
    <v-app-bar>
      <v-spacer></v-spacer>

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
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark;
      this.isDark == 1
        ? (this.$vuetify.theme.global.name = "dark")
        : (this.$vuetify.theme.global.name = "light");
    },
  },
};
</script>
