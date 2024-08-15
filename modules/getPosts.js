import { getAllPosts } from "./postApi.js";

// Función para mostrar las etiquetas en el contenedor
const renderTags = (tags, tagsContainer) => {
  tags.forEach((tag) => {
    const tagElement = document.createElement("a");
    tagElement.href = `tags.html?tag=${tag.replace(/^#/, "")}`;
    tagElement.className = "tag-link text-secondary";
    tagElement.textContent = `#${tag.replace(/^#/, "")}`;
    tagElement.style.textDecoration = "none";
    tagsContainer.appendChild(tagElement);
  });
};

// Función para crear una card
const createCard = (post, isFirst) => {
  const cardLink = document.createElement("div");
  cardLink.style.width = "100%";
  cardLink.className = "card mb-3";
  cardLink.style.textDecoration = "none";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  cardBody.style.height = "auto";

  const cardImg = document.createElement("img");
  cardImg.src = post.image; // Usamos post.image del backend
  cardImg.className = "card-img-top img-fluid";
  cardImg.alt = post.title;
  cardImg.classList.add("card-box");

  if (!isFirst) {
    cardImg.style.display = "none";
  } else {
    cardImg.style.width = "100%";
    cardImg.style.margin = "0";
    cardImg.style.padding = "0";
    cardBody.appendChild(cardImg);
  }

  const authorAndDate = document.createElement("div");
  const author = document.createElement("small");
  author.className = "text-muted fw-bold d-block";
  author.textContent = post.user;
  const date = document.createElement("small");
  date.className = "text-muted d-block";
  date.textContent = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  authorAndDate.appendChild(author);
  authorAndDate.appendChild(date);

  const cardTitle = document.createElement("a");
  cardTitle.href = `generalPost.html?id=${post.id}`;
  cardTitle.className = "card-title h5 my-3";
  cardTitle.textContent = post.title;
  cardTitle.addEventListener("mouseover", () => {
    cardTitle.style.color = "blue";
  });
  cardTitle.addEventListener("mouseout", () => {
    cardTitle.style.color = "black";
  });
  cardTitle.style.textDecoration = "none";
  cardTitle.style.display = "block";

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "mb-2";
  renderTags(post.tags, tagsContainer); // Asumiendo que `post.tags` es un array de strings

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = post.body.split(" ").slice(0, 12).join(" ") + "..."; // Usamos post.body para el texto de la card
  cardText.style.textDecoration = "none";

  cardBody.appendChild(authorAndDate);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(tagsContainer);
  cardBody.appendChild(cardText);
  cardLink.appendChild(cardBody);

  return cardLink;
};

// Función para obtener y renderizar los posts
export const getPosts = async () => {
  const response = await getAllPosts();

  const posts = response.data.posts;

  if (!Array.isArray(posts)) {
    console.error("Expected an array but got:", posts);
    return;
  }

  const cardContainer = document.getElementById("card-container");

  posts.forEach((post, index) => {
    const card = createCard(post, index === 0);
    cardContainer.appendChild(card);
  });
};
