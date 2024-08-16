import { getUserProfile } from "./userApi.js";
import { parseJwt } from "./utils/parseJwt.js";

async function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg navbar-light bg-light w-100";

  const brandLink = document.createElement("a");
  brandLink.className = "navbar-brand d-flex align-items-center";
  brandLink.href = "index.html";

  const img = document.createElement("img");
  img.src = ".././images/DevIcon.jpg";
  img.alt = "MyApp Logo";
  img.style.height = "40px"; // Tamaño fijo del logo
  img.style.paddingLeft = "3rem"; // Espacio a la izquierda

  brandLink.appendChild(img);

  const searchForm = document.createElement("form");
  searchForm.className = "form-inline my-2 my-lg-0 mx-3 flex-grow-1";
  searchForm.style.position = "relative";

  const searchInput = document.createElement("input");
  searchInput.className = "form-control mr-sm-2 w-100 d-none d-lg-block";
  searchInput.type = "search";
  searchInput.placeholder = "Search";

  const searchIcon = document.createElement("span");
  searchIcon.className = "fas fa-search";
  searchIcon.style.position = "absolute";
  searchIcon.style.right = "10px";
  searchIcon.style.top = "50%";
  searchIcon.style.transform = "translateY(-50%)";
  searchIcon.style.color = "#6c757d";

  searchForm.appendChild(searchInput);
  searchForm.appendChild(searchIcon);

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
  collapseDiv.className = "collapse navbar-collapse justify-content-end";
  collapseDiv.id = "navbarNav";

  const token = localStorage.getItem("token");
  const idFromToken = localStorage.getItem("idFromToken");

  if (!token || !idFromToken) {
    const loginButton = document.createElement("button");
    loginButton.className = "btn btn-outline-success mr-3";
    loginButton.type = "button";
    loginButton.textContent = "Log In";
    loginButton.style.marginRight = "1rem";
    loginButton.addEventListener("click", () => {
      window.location.href = "views/login.html";
    });

    const createAccountButton = document.createElement("button");
    createAccountButton.className = "btn btn-outline-primary";
    createAccountButton.type = "button";
    createAccountButton.textContent = "Create Account";
    createAccountButton.style.marginRight = "1rem";
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
    logoutButton.style.marginRight = "1rem";
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("idFromToken");
      window.location.href = "index.html";
    });

    const createPostButton = document.createElement("button");
    createPostButton.className = "btn btn-primary mr-3";
    createPostButton.type = "button";
    createPostButton.textContent = "Create Post";
    createPostButton.style.marginRight = "1rem";
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
      profilePic.style.marginRight = "1rem";
      collapseDiv.appendChild(profilePic);
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
    }

    collapseDiv.appendChild(logoutButton);
    collapseDiv.appendChild(createPostButton);
  }

  nav.appendChild(brandLink);
  nav.appendChild(searchForm);
  nav.appendChild(togglerButton);
  nav.appendChild(collapseDiv);
  return nav;
}

export { createNavbar };
