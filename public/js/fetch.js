import { x } from "./app.js";

async function postData(url = "", reqMethod, data = {}) {
  let response;
  if(reqMethod!=='GET'){
   response = await fetch(url, {
    method: reqMethod,
    headers: {
      Authorization: `Bearer ${x}`,
    },
    body: data, // body data type must match "Content-Type" header
  });
}else if (reqMethod == 'GET'){
   response = await fetch(url, {
    method: reqMethod,
    headers: {
      Authorization: `Bearer ${x}`,
    },
  });
}

  return response.json(); // parses JSON response into native JavaScript objects
}

export { postData };
