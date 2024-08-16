import { getUserProfile } from "./userApi.js";

async function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg navbar-light bg-light";

  const brandLink = document.createElement("a");
  brandLink.className = "navbar-brand";
  brandLink.href = "index.html";
  brandLink.textContent = "MyApp";

  const togglerButton = document.createElement("button");
  togglerButton.className = "navbar-toggler";
  togglerButton.type = "button";
  togglerButton.setAttribute("data-toggle", "collapse");
  togglerButton.setAttribute("data-target", "#navbarNav");
  togglerButton.setAttribute("aria-controls", "navbarNav");
  togglerButton.setAttribute("aria-expanded", "false");
  togglerButton.setAttribute("aria-label", "Toggle navigation");

  const togglerIcon = document.createElement("span");
  togglerIcon.className = "navbar-toggler-icon";
  togglerButton.appendChild(togglerIcon);

  const collapseDiv = document.createElement("div");
  collapseDiv.className = "collapse navbar-collapse";
  collapseDiv.id = "navbarNav";

  const token = localStorage.getItem("token");
  const idFromToken = localStorage.getItem("idFromToken");

  if (!token || !idFromToken) {
    const loginButton = document.createElement("button");
    loginButton.className = "btn btn-outline-success mr-3";
    loginButton.type = "button";
    loginButton.textContent = "Log In";
    loginButton.addEventListener("click", () => {
      window.location.href = "views/login.html";
    });

    const createAccountButton = document.createElement("button");
    createAccountButton.className = "btn btn-outline-primary";
    createAccountButton.type = "button";
    createAccountButton.textContent = "Create Account";
    createAccountButton.addEventListener("click", () => {
      window.location.href = "views/signin.html";
    });

    collapseDiv.appendChild(loginButton);
    collapseDiv.appendChild(createAccountButton);
  } else {
    const logoutButton = document.createElement("button");
    logoutButton.className = "btn btn-outline-danger mr-3";
    logoutButton.type = "button";
    logoutButton.textContent = "Log Out";
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("idFromToken");
      window.location.href = "index.html";
    });

    const createPostButton = document.createElement("button");
    createPostButton.className = "btn btn-primary mr-3";
    createPostButton.type = "button";
    createPostButton.textContent = "Create Post";
    createPostButton.addEventListener("click", () => {
      window.location.href = "views/createPost.html";
    });

    try {
      const userProfile = await getUserProfile(idFromToken);
      const profilePic = document.createElement("img");
      profilePic.src = userProfile.profilePic;
      profilePic.alt = "Profile Picture";
      profilePic.width = 40;
      profilePic.style.borderRadius = "50%";
      collapseDiv.appendChild(profilePic);
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
    }

    collapseDiv.appendChild(logoutButton);
    collapseDiv.appendChild(createPostButton);
  }

  nav.appendChild(brandLink);
  nav.appendChild(togglerButton);
  nav.appendChild(collapseDiv);
  return nav;
}

export { createNavbar };
