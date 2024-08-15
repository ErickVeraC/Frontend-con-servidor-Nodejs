import { getUserProfile } from "./postApi.js";

export async function createNavbar() {
  const nav = document.createElement("nav");
  nav.className = "navbar navbar-expand-lg navbar-light bg-light d-flex gap-3";

  const brandLink = document.createElement("a");
  brandLink.className = "navbar-brand";
  brandLink.href = "#";

  const brandImg = document.createElement("img");
  brandImg.src = "/images/DevIcon.jpg";
  brandImg.alt = "Dev Icon";
  brandImg.width = 40;
  brandImg.className = "ms-3";

  brandLink.appendChild(brandImg);

  const togglerButton = document.createElement("button");
  togglerButton.className = "navbar-toggler";
  togglerButton.type = "button";
  togglerButton.setAttribute("data-toggle", "collapse");
  togglerButton.setAttribute("data-target", "#navbarSupportedContent");
  togglerButton.setAttribute("aria-controls", "navbarSupportedContent");
  togglerButton.setAttribute("aria-expanded", "false");
  togglerButton.setAttribute("aria-label", "Toggle navigation");

  const togglerIcon = document.createElement("span");
  togglerIcon.className = "navbar-toggler-icon";

  togglerButton.appendChild(togglerIcon);

  const collapseDiv = document.createElement("div");
  collapseDiv.className = "collapse navbar-collapse";
  collapseDiv.id = "navbarSupportedContent";

  const navList = document.createElement("ul");
  navList.className = "navbar-nav mr-auto";
  collapseDiv.appendChild(navList);

  const token = localStorage.getItem("authToken");
  if (!token) {
    const loginButton = document.createElement("button");
    loginButton.className = "btn ml-3 mr-3";
    loginButton.type = "button";
    loginButton.textContent = "Log In";
    loginButton.addEventListener("click", () => {
      window.location.href = "views/login.html";
    });

    const createAccountButton = document.createElement("button");
    createAccountButton.className = "btn btn-outline-primary mr-3";
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
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
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
      const userProfile = await getUserProfile(token);
      const profilePic = document.createElement("img");
      profilePic.src = userProfile.profilePicUrl;
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
