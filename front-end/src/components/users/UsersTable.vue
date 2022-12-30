<template>
  <v-container :align="cardAlign">
    <v-row>
      <v-card :width="cardWidth">
        <v-card-title>Lista użytkowników</v-card-title>
        <v-alert
          closable
          type="error"
          v-if="error"
          title="Błąd"
          :text="error"
          @click="handleError"
        ></v-alert>
        <v-card-text>
          <v-table v-if="hasUserList">
            <thead>
              <tr>
                <th class="text-left">Imię</th>
                <th class="text-left">Nazwisko</th>
                <th class="text-left">Email</th>
                <th class="text-left">Numer telefonu</th>
                <th class="text-left">Data urodzenia</th>
                <th class="text-left">Akcje</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in getUserList" :key="user.id">
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phoneNumber }}</td>
                <td>{{ user.dateOfBirth }}</td>
                <td align="left">
                  <font-awesome-icon
                    class="fa-solid fa-pen-to-square"
                    icon="fa-solid fa-pen-to-square"
                    @click="selectUser(user)"
                  />
                  <font-awesome-icon
                    @click="deleteUser(user.id)"
                    class="fa-solid fa-trash"
                    icon="fa-solid fa-trash"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>

        <v-container class="max-width" justify="center">
          <v-pagination
            v-model="page"
            class="my-4"
            :length="getTotalPages"
            rounded="circle"
            @input="currentPage"
          ></v-pagination>
        </v-container>
      </v-card>

      <v-card width="49%" align="right" class="ml-1">
        <user-edit-form
          v-if="this.currentUser"
          @save-user-data="saveEditedUser"
          :firstName2="currentUser.firstName"
          :lastName2="currentUser.lastName"
          :phoneNumber2="currentUser.phoneNumber"
          :birthday2="currentUser.dateOfBirth"
          :email2="currentUser.email"
          :editToggle="this.toggleEditModeOff"
        >
        </user-edit-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import UserEditForm from "./UserEditForm.vue";

export default {
  data() {
    return {
      page: 1,
      error: null,
      editMode: false,
      cardWidth: "100%",
      cardAlign: "center",
      currentUser: null,
    };
  },
  components: {
    UserEditForm,
  },
  created() {
    this.loadUsersWithPagination();
  },
  methods: {
    async loadUsersWithPagination() {
      try {
        await this.$store.dispatch("users/loadUsersWithPagination", this.page);
      } catch (error) {
        this.error = "Nie udało się pobrać listy uzytkowników";
      }
    },
    async saveEditedUser(data) {
      data.id = this.currentUser.id;

      try {
        await this.$store.dispatch("users/updateUser", data);
        this.loadUsersWithPagination();
      } catch (error) {
        this.error = "Aktualizacja danych nie powiodła się";
      }
    },
    async deleteUser(id) {
      try {
        await this.$store.dispatch("users/deleteUser", id);
        this.loadUsersWithPagination();
      } catch (error) {
        this.error = "Usunięcie użytkownika nie powiodło się";
      }
    },

    selectUser(user) {
      this.currentUser = user;
      this.toggleEditModeOn();
    },
    handleError() {
      this.error = null;
    },
    toggleEditModeOn() {
      this.editMode = true;
      this.cardWidth = "50%";
      this.cardAlign = "left";
    },
    toggleEditModeOff() {
      this.editMode = false;
      this.currentUser = null;
      this.cardWidth = "100%";
      this.cardAlign = "center";
    },
  },
  computed: {
    hasUserList() {
      return this.$store.getters["users/hasUserList"];
    },
    getUserList() {
      return this.$store.getters["users/userList"];
    },
    getTotalPages() {
      return this.$store.getters["users/totalPages"];
    },
    currentPage() {
      this.loadUsersWithPagination();
      return true;
    },
  },
};
</script>

<style scoped>
.fa-solid {
  padding-left: 8%;
  cursor: pointer;
}

.fa-pen-to-square {
  color: #df9848;
}

.fa-pen-to-square:hover {
  color: #be6b0b;
}

.fa-trash {
  color: #c54d4d;
}

.fa-trash:hover {
  color: #b11b1b;
}
</style>
