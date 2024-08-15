import { login } from "./userApi.js";

document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const { token, userId } = await login(email, password);

      // Decodificar el payload del token
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const decodedToken = JSON.parse(jsonPayload);
      const idFromToken = decodedToken.id;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("idFromToken", idFromToken);

      window.location.href = "../index.html"; // Redirigir a index.html
    } catch (error) {
      document.getElementById("error-message").textContent = error.message;
    }
  });
