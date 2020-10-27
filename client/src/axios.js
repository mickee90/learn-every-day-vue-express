import axios from "axios";
import router from "@/router/index";
import { baseMessage } from "@/helpers/FlashMessage";

let instance;
if (window.Cypress) {
  instance = axios.create({
    baseURL: "http://localhost:3333/api/v1"
  });
} else {
  instance = axios.create({
    baseURL: "http://localhost:3000/api/v1"
  });
}

instance.defaults.headers.get["Accepts"] = "application/json";

// This will allow the browser to send back the HttpOnly Cookie which includes our JWT token.
instance.defaults.withCredentials = true;

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 500) {
      window.globalVue.flashMessage.error(
        baseMessage({
          title: "Error",
          message: "Ops! Something is wrong.. Please try again."
        })
      );
      return;
    }

    if (error.response.status === 400 || error.response.status === 422) {
      const errors = error.response.data.errors;

      errors.forEach(error => {
        window.globalVue.flashMessage.error(
          baseMessage({
            message: error["msg"]
          })
        );
      });
    }

    if (error.response.status === 404) {
      window.globalVue.flashMessage.error(
        baseMessage({
          title: "Error",
          message: "Ops! Something is wrong.. Please try again."
        })
      );
      return;
    }

    if (error.response.status === 401) {
      localStorage.removeItem("led_user");
      localStorage.removeItem("led_isLoggedIn");

      if (router.currentRoute.name !== "Login") {
        router.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
