import { getdata } from "./fetchapi.js";

// postData("/confirmation", "POST", data).then((res) => console.log(res));



const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  console.log("hi");
  e.preventDefault();
});
