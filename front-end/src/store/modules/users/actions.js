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
    const id = store.getters.userId;
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
};
