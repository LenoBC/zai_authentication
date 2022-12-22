<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Logowanie</v-card-title>
          <v-card-text>
            <v-form ref="loginForm" v-model="valid">
              <v-text-field
                v-model.trim="email"
                :rules="emailRules"
                label="Adres e-mail"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model.trim="password"
                :rules="passwordRules"
                label="Hasło"
                type="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="submitForm" :disabled="!valid"
              >Zaloguj</v-btn
            >
          </v-card-actions>

          <v-card-text>
            Nie masz konta?
            <router-link to="/register">Załóż konto</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      error: "",
      emailRules: [
        (v) => !!v || "Adres email jest wymagany",
        (v) => /.+@.+/.test(v) || "Nieprawidłowy adres email",
      ],
      passwordRules: [(v) => !!v || "Hasło jest wymagane"],
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.loginForm.validate()) {
        const loginData = {
          email: this.email,
          password: this.password,
        };

        console.log("registerData", loginData);
      }
    },
  },
};
</script>

<style scoped></style>
