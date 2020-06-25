import { x } from "./app.js";

async function postData(url = "", reqMethod, data = {}) {
  const response = await fetch(url, {
    method: reqMethod,
    headers: {
      Authorization: `Bearer ${x}`,
    },
    body: data, // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export { postData };
