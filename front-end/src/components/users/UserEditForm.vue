<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Aktualizacja Danych</v-card-title>
          <v-card-text>
            <v-form ref="form">
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

              <div align="left" justify="left" style="display: flex">
                <v-card-text>Zmień hasło</v-card-text>
                <v-btn
                  class="position-relative mr-40"
                  variant="outlined"
                  size="small"
                  icon
                  color="info"
                  @click="togglePassword"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>

              <div v-if="changePwd">
                <v-text-field
                  v-model.trim="formData.currentPassword"
                  label="Podaj obecne hasło"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model.trim="formData.password"
                  :rules="passwordRules"
                  label="Podaj nowe hasło"
                  type="password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model.trim="formData.passwordChek"
                  :rules="passwordCheckRules"
                  label="Powtórz nowe hasło"
                  type="password"
                  required
                ></v-text-field>
              </div>
              <v-btn @click="submitForm">Zaktualizuj dane</v-btn>
              <v-btn class="bg-blue ml-3" @click="cancelUpdate">Anuluj</v-btn>
              <v-alert
                closable
                type="error"
                v-if="error"
                title="Błąd"
                :text="error"
                @click="handleError"
              ></v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  emits: ["save-user-data"],
  props: [
    "firstName2",
    "lastName2",
    "phoneNumber2",
    "birthday2",
    "email2",
    "editToggle",
  ],
  data() {
    return {
      valid: true,
      error: null,
      formData: {
        firstName: this.firstName2 ? this.firstName2 : "",
        lastName: this.lastName2 ? this.lastName2 : "",
        email: this.email2 ? this.email2 : "",
        birthday: this.birthday2 ? this.birthday2 : "",
        phone: this.phoneNumber2 ? this.phoneNumber2 : "",
        password: "",
        passwordChek: "",
        currentPassword: "",
      },
      changePwd: false,
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
        (v) =>
          v === this.formData.currentPassword ||
          "Nowe hasło jest takie samo jak obecne",
      ],
      passwordCheckRules: [
        (v) => !!v || "Powtórzenie hasła jest wymagane",
        (v) => v === this.formData.password || "Hasła się nie zgadzają",
      ],
    };
  },
  methods: {
    submitForm() {
      this.isFormValid();
      if (!this.valid) {
        return;
      }

      const updatedUserData = {
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        email: this.formData.email,
        birthday: this.formData.birthday,
        phone: this.formData.phone,
        currentPassword: this.formData.currentPassword,
        password: this.formData.password,
      };

      this.$emit("save-user-data", updatedUserData);
    },
    cancelUpdate() {
      this.$router.replace("/users");
    },
    togglePassword() {
      this.changePwd = !this.changePwd;
    },
    isFormValid() {
      this.valid = true;
      this.error = null;

      if (!this.formData.firstName) {
        this.valid = false;
      }
      if (this.formData.firstName.length > 15) {
        this.valid = false;
      }

      if (!this.formData.lastName) {
        this.valid = false;
      }
      if (this.formData.lastName.length > 15) {
        this.valid = false;
      }

      if (!this.formData.email) {
        this.valid = false;
      }
      if (!/.+@.+/.test(this.formData.email)) {
        this.valid = false;
      }

      if (!this.formData.birthday) {
        this.valid = false;
      }
      const today = new Date();
      const birthday = new Date(this.formData.birthday);
      if (birthday > today) {
        this.valid = false;
      }

      if (!this.formData.phone) {
        this.valid = false;
      }
      if (!/^\d{9}$/.test(this.formData.phone)) {
        this.valid = false;
      }

      if (this.changePwd && !this.formData.currentPassword) {
        this.valid = false;
      }

      if (this.changePwd && !this.formData.password) {
        this.valid = false;
      }
      if (this.changePwd && this.formData.password.length < 8) {
        this.valid = false;
      }
      if (
        this.changePwd &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          this.formData.password
        )
      ) {
        this.valid = false;
      }
      if (
        this.changePwd &&
        this.formData.password === this.formData.currentPassword
      ) {
        this.valid = false;
      }
      if (this.changePwd && !this.formData.passwordChek) {
        this.valid = false;
      }
      if (
        this.changePwd &&
        this.formData.passwordChek !== this.formData.password
      ) {
        this.valid = false;
      }

      if (!this.valid) {
        this.error = "Wypełnij poprawnie dane";
      }
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {},
};
</script>
