const BASE_URL = "https://desafio-backend-jnku.onrender.com";

async function createUser(email, password, name, profilePic) {
  const response = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, profilePic }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }

  const data = await response.json();
  return data;
}

async function login(email, password) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }

  const data = await response.json();
  return { token: data.data.token, userId: data.data.userId };
}

const getUserProfile = async (id) => {
  const response = await fetch(`${BASE_URL}/user/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.data;
};

export { login, createUser, getUserProfile };
