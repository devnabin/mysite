import { postData } from "./fetch.js";

let blogid;
if (localStorage.getItem("blogid")) {
  blogid = localStorage.getItem("blogid");
  postData(`/blog/${blogid}`, "GET").then((res) => {
    console.log(res)
      document.querySelector('h1').textContent = res.heading
      document.querySelector('#postimg').src = `/blog/image/${blogid}`
      document.querySelector('p').textContent = res.description
      document.getElementById('user').textContent = res.postowner
      const time = res.createdAt.split('T')
      document.getElementById('time').textContent = time[0]

  });
}
