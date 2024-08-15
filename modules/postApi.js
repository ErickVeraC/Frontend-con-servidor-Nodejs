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

// Función para realizar la solicitud POST al servidor
const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.data.token;
};

// Obtener perfil del usuario
async function getUserProfile(token) {
  const userId = localStorage.getItem("userId");
  const response = await fetch(`${BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return await response.json();
}

export { getAllPosts, login, getUserProfile };
