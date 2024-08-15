import { createUser } from "./userApi.js";

const handleSignup = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  const profilePic = document.getElementById("profilePic").value;
  const errorMessage = document.getElementById("error-message");

  try {
    const userData = await createUser(email, password, name, profilePic);
    console.log("User created successfully:", userData);
    window.location.href = "../index.html";
  } catch (error) {
    errorMessage.textContent = "Error: " + error.message;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  form.addEventListener("submit", handleSignup);
});
