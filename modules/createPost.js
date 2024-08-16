import { createPost } from "./postApi.js";
import { parseJwt } from "./utils/parseJwt.js";

document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form");
  const publishPostBtn = document.getElementById("save-post-btn");
  const tagsInput = document.getElementById("postTags");
  const tagsContainer = document.getElementById("tagsContainer");
  const postTitle = document.getElementById("postTitle");
  const postBody = document.getElementById("postAbout");
  const postImage = document.getElementById("postImage"); // Asegúrate de tener un input para la imagen
  const postInfo = document.getElementById("postInfo");

  let postsObject = {};
  let tagsArray = [];

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderTags = () => {
    while (tagsContainer.firstChild) {
      tagsContainer.removeChild(tagsContainer.firstChild);
    }

    tagsArray.forEach((tag, index) => {
      const tagElement = document.createElement("span");
      tagElement.className = "badge me-1";
      tagElement.style.backgroundColor = getRandomColor();
      tagElement.style.color = "white";
      tagElement.style.borderRadius = "0.25rem";
      tagElement.style.display = "inline-block";
      tagElement.style.margin = "0.2rem";
      tagElement.style.padding = "0.5rem 1rem";
      tagElement.style.textAlign = "center";

      const tagText = document.createElement("span");
      tagText.textContent = tag;
      tagElement.appendChild(tagText);

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn-close ms-2";
      deleteButton.style.float = "none";
      deleteButton.addEventListener("click", () => {
        tagsArray.splice(index, 1);
        renderTags();
        tagsInput.style.display = "block";
      });

      tagElement.appendChild(deleteButton);
      tagsContainer.appendChild(tagElement);
    });

    if (tagsArray.length >= 4) {
      tagsInput.style.display = "none";
    }
  };

  tagsInput.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      const tag = event.target.value.trim();
      if (tag && !tagsArray.includes(tag) && tagsArray.length < 4) {
        tagsArray.push(tag);
        renderTags();
      }
      event.target.value = "";
      event.preventDefault();
    }
  });

  publishPostBtn.addEventListener("click", async () => {
    postsObject.title = postTitle.value;
    postsObject.body = postBody.value;
    postsObject.image = postImage.value; // Asegúrate de tener un input para la imagen
    postsObject.tags = tagsArray.map((tag) => `#${tag}`);
    postsObject.timestamp = new Date().toLocaleString();

    const token = localStorage.getItem("token");
    const userId = parseJwt(token)?.id;
    if (userId) {
      postsObject.user = userId;
    } else {
      console.error("User ID not found in token");
      return;
    }

    console.log("Token:", token);
    console.log("Post Data:", postsObject);

    try {
      await createPost(postsObject, token);
      const successMessage = document.getElementById("success-message");
      if (successMessage) {
        successMessage.classList.remove("d-none");
        setTimeout(() => {
          successMessage.classList.add("d-none");
          window.location.href = "../index.html";
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      const errorMessage = document.getElementById("error-message");
      if (errorMessage) {
        errorMessage.classList.remove("d-none");
        setTimeout(() => {
          errorMessage.classList.add("d-none");
        }, 3000);
      }
    }
  });
});
