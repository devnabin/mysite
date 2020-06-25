var x = localStorage.getItem("key");
if (x) {
  getRes("/user")
    .then((res) => {
      document.getElementById("logText").textContent = res.name; 
      document.querySelector(".loginButton").href = "/me";
      document.querySelector(".loginButtonImg").href = "/me";
          })
    .catch((error) => console.log(error));
}

async function getRes(url, data = {}) {
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${x}`,
          },
  });
  return response.json();
}



export { x }