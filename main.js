import { createNavbar } from "./modules/navbar.js";
import { getPosts } from "./modules/getPosts.js";

document.addEventListener("DOMContentLoaded", async () => {
  const navbar = await createNavbar();
  document.getElementById("navbar").appendChild(navbar);
  getPosts();
});
