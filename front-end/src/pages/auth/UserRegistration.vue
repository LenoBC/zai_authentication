<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Rejestracja</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model.trim="formData.firstName"
                :rules="nameRules"
                label="Imię"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model.trim="formData.lastName"
                :rules="nameRules"
                label="Nazwisko"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model.trim="formData.email"
                :rules="emailRules"
                label="Adres email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model.trim="formData.password"
                :rules="passwordRules"
                label="Podaj hasło"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model.trim="formData.passwordChek"
                :rules="passwordCheckRules"
                label="Powtórz hasło"
                type="password"
                required
              ></v-text-field>
              <v-text-field
                v-model.trim="formData.birthday"
                :rules="birthdayRules"
                label="Data urodzenia"
                type="date"
                required
              ></v-text-field>
              <v-text-field
                v-model.trim="formData.phone"
                :rules="phoneRules"
                label="Numer telefonu"
                required
              ></v-text-field>
              <v-btn @click="submitForm" :disabled="!valid"
                >Zarejestruj się</v-btn
              >
            </v-form>
          </v-card-text>
          <v-card-text>
            Masz konto?
            <router-link to="/login">Zaloguj</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        birthday: "",
        phone: "",
        password: "",
        passwordChek: "",
      },
      nameRules: [
        (v) => !!v || "Imię jest wymagane",
        (v) => (v && v.length <= 15) || "Imię musi być krótsze niż 15 znaków",
      ],
      emailRules: [
        (v) => !!v || "Adres email jest wymagany",
        (v) => /.+@.+/.test(v) || "Nieprawidłowy adres email",
      ],
      birthdayRules: [
        (v) => !!v || "Data urodzenia jest wymagana",
        (v) => {
          const today = new Date();
          const birthday = new Date(v);
          return (
            birthday < today || "Data urodzenia nie może być w przyszłości"
          );
        },
      ],
      phoneRules: [
        (v) => !!v || "Numer telefonu jest wymagany",
        (v) =>
          /^\d{9}$/.test(v) ||
          "Nieprawidłowy numer telefonu (dozwolone tylko cyfry, 9 znaków)",
      ],
      passwordRules: [
        (v) => !!v || "Hasło jest wymagane",
        (v) =>
          (v && v.length >= 8) || "Hasło musi zawierać co najmniej 8 znaków",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          ) ||
          "Hasło musi zawierać co najmniej jedną małą literę, jedną wielką literę i jedną cyfrę",
      ],
      passwordCheckRules: [
        (v) => !!v || "Powtórzenie hasła jest wymagane",
        (v) => v === this.formData.password || "Hasła się nie zgadzają",
      ],
    };
  },
  methods: {
    submitForm() {
      if (this.$refs.form.validate()) {
        const registerData = {
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          password: this.formData.password,
          birthday: this.formData.birthday,
          phoneNumber: this.formData.phone,
        };

        

        console.log("registerData", registerData);
      }
    },
  },
};
</script>
