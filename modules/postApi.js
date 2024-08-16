const BASE_URL = "https://desafio-backend-jnku.onrender.com";

async function getAllPosts() {
  try {
    const response = await fetch(`${BASE_URL}/post`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data); // <-- Verifica la estructura aquí
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Devuelve un array vacío en caso de error
  }
}

async function createPost(postData, token) {
  try {
    const response = await fetch(`${BASE_URL}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(
        `Network response was not ok: ${response.statusText} - ${errorDetails}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export { getAllPosts, createPost };
