const goBack = document.getElementById("return");
const menu = document.getElementById("menu");
const logout = document.getElementById("logout");
const task = document.getElementById("task");
const deleteAccout = document.getElementById("deleteAccount");

import { x } from "./app.js";

task.addEventListener("click", () => {
  window.location.href = "me/task";
});

//1
//return go back
goBack.addEventListener("click", () => {
  window.location.href = "/";
});

//2
//Logout
logout.addEventListener("click", () => {
  window.scrollTo({
    top: 2000,
    left: 0,
    behavior: "smooth",
  });
});

deleteAccout.addEventListener("click", () => {
  window.scrollTo({
    top: 2000,
    left: 0,
    behavior: "smooth",
  });
});

update.addEventListener("click", () => {
  window.scrollTo({
    top: 750,
    left: 0,
    behavior: "smooth",
  });
});

//logout user and from all devices
const logoutbut = document.getElementById("logoutbut");
logoutbut.addEventListener("click", () => {
  const one = document.getElementById("log-out").checked;
  const two = document.getElementById("log-out-all").checked;
  if (one && two) {
    const url = `/user/logouts`;
    const method = "POST";
    makeReq(url, method)
      .then((data) => {
        console.log(data);
        localStorage.removeItem("key");
        window.location.href = "/";
      })
      .catch((error) => console.log(error));
  } else if (one) {
    const url = `/user/logout`;
    const method = "POST";
    makeReq(url, method)
      .then((data) => {
        console.log(data);
        localStorage.removeItem("key");
        window.location.href = "/";
      })
      .catch((error) => console.log(error));
  }
});

//delete Accoutn
const deleteAcc = document.getElementById("deletebut");
deleteAcc.addEventListener("click", () => {
  const chk = document.getElementById("delete-account").checked;
  if (chk) {
    const url = `/user/delete`;
    const method = "DELETE";
    makeReq(url, method)
      .then((data) => {
        console.log(data);
        localStorage.removeItem("key");
        window.location.href = "/";
      })
      .catch((error) => console.log(error));
  }
});

//password
document.getElementById("makePassChange").addEventListener("click", (e) => {
  const oldpass = document.getElementById("oldpass").value;
  const newpass1 = document.getElementById("newpass1").value;
  const newpass2 = document.getElementById("newpass2").value;
  if (oldpass && newpass1 && newpass2) {
    console.log(oldpass, newpass1, newpass2);
    if (newpass1 === newpass2) {
      const url = `/user/update`;
      const method = "PATCH";
      const data = {
        password: {
          oldpass,
          newpass1,
        },
      };
      makeReq(url, method, data)
        .then((data) => {
          //=================
          const makeurl = `/user/logout`;
          const makemethod = "POST";
          makeReq(makeurl, makemethod)
            .then((data) => {
              localStorage.removeItem("key");
              window.location.href = "/";
            })
            .catch((error) => console.log(error));
          //=======
        })
        .catch((error) => console.log(error));
    } else {
      console.log("please enter the same Password");
    }
  } else {
    console.log("error");
  }
  e.preventDefault();
});

//bio and username
document.getElementById("makeupdate").addEventListener("click", (e) => {
  const newUser = document.getElementById("newUserName").value;
  const bio = document.getElementById("bio").value;
  console.log(newUser, bio);
  if (bio.length <= 20) {
    return alert(`bio should be greater then 20 digits`);
  }
  if (newUser) {
    alert(`Changing User name is currently unavailbale`);
  }

  if (newUser || bio) {
    const url = `/user/update`;
    const method = "PATCH";
    const data = {
      bio,
    };
    makeReq(url, method, data)
      .then((data) => {
        window.location.href = "/me";
      })
      .catch((error) => console.log(error));
  }
  e.preventDefault();
});

async function makeReq(url, method, data = {}) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${x}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

//load  or show value to the browser
  if (x) {
    getRes("/user")
      .then((res) => {
        console.log(res);

        document.getElementById("name").textContent = res.name;
        document.getElementById("email").textContent = res.email;
        document.querySelector(".sub2-child2 p").textContent = res.bio;

        //update profile
        if (localStorage.getItem("image") == "1") {
          document.getElementById("pp").src = `/user/pic/${res._id}`;
        }
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

//profile picture
document.getElementById("uploadpic-but").addEventListener("click", () => {
  const img = document.getElementById("upload-photo").files[0];
  let data = new FormData();
  data.append("upload", img);

  fetch("/user/pic", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${x}`,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.done == "done") {
        localStorage.setItem("image", "1");
        window.location.href = '/me'
      }
    });
});
