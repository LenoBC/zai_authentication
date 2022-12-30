import store from "@/store";

export default {
  async loadUserDetails(context) {
    const id = store.getters.userId;

    const response = await fetch(context.rootGetters.host + `/users/${id}`, {
      headers: {
        Authorization: store.getters.token,
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się pobrać danych!"
      );
      throw error;
    }

    const userData = {
      id: responseData.id,
      firstName: responseData.firstName,
      lastName: responseData.lastName,
      phoneNumber: responseData.phoneNumber,
      email: responseData.email,
      birthday: responseData.dateOfBirth,
      role: responseData.role,
    };

    context.commit("setUser", userData);
  },

  async updateUser(context, data) {
    let id = null;
    if (data.id) {
      id = data.id;
    } else {
      id = store.getters.userId;
    }

    let userData = null;

    if (data.password == "") {
      userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phone,
        dateOfBirth: data.birthday,
        email: data.email,
      };
    } else if (data.password.length > 0) {
      userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phone,
        dateOfBirth: data.birthday,
        email: data.email,
        currentPassword: data.currentPassword,
        password: data.password,
      };
    }

    const response = await fetch(context.rootGetters.host + `/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: store.getters.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = new Error("Nie udało się edytować danych");
      error.status = response.status;
      throw error;
    }
  },
  async loadUsersWithPagination(context, page) {
    const response = await fetch(
      context.rootGetters.host + `/users?page=${page - 1}&size=10`,
      {
        headers: {
          Authorization: store.getters.token,
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || "Nie udało się pobrać danych!"
      );
      throw error;
    }

    const users = [];
    const totalPages = responseData.totalPages;

    for (const key in responseData.content) {
      const user = {
        id: responseData.content[key].id,
        firstName: responseData.content[key].firstName,
        lastName: responseData.content[key].lastName,
        email: responseData.content[key].email,
        dateOfBirth: responseData.content[key].dateOfBirth,
        phoneNumber: responseData.content[key].phoneNumber,
        role: responseData.content[key].role,
      };
      users.push(user);
    }

    context.commit("setUserList", users);
    context.commit("setTotalPages", totalPages);
  },
  async deleteUser(context, id) {
    const response = await fetch(context.rootGetters.host + `/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: store.getters.token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = new Error("Nie udało się usunąć budynku!");
      throw error;
    }
  },
};
