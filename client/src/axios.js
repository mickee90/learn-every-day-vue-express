import axios from "axios";
import router from "@/router/index";

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
    if (error.response.status === 500 || error.response.status === 400) {
      // @todo add real error response
      alert("Ops! Something went wrong. Please try again.");
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
