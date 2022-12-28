let timer;

export default {
  async login(context, data) {
    const response = await fetch(context.rootGetters.host + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          "Nie udało się zalogować. Sprawdź dane logowania"
      );
      throw error;
    }

    const expiresIn = +1200 * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("userId", responseData.id);
    localStorage.setItem("role", responseData.role);
    localStorage.setItem("token", responseData.token);
    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.token,
      role: responseData.role,
      userId: responseData.id,
    });
  },
  tryLogin(context) {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId && role) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        role: role,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
      role: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
