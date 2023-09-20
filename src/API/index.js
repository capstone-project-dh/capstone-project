const API = "https://fakestoreapi.com";

export async function fetchProducts() {
  try {
    const res = await fetch(`${API}/products`);
    const result = res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
export async function fetchSingleProduct(id) {
  try {
    const res = await fetch(`${API}/products/${id}`);
    const result = res.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function userLogin(username, password) {
    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const resultData = await response.json();
      return resultData.token;
    } catch (error) {
      console.log(error);
    }
  }

