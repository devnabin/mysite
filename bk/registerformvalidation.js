let access = 0;
//Registration Form validation
function validateForm() {
  access = 0;
  document.querySelector("p").textContent = "";
  document.getElementById("username").style["border-color"] = "black";
  document.getElementById("password").style["border-color"] = "black";
  document.querySelector(".userlogo").style.color = "black";
  document.querySelector(".passlogo").style.color = "black";

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  //User Name validation
  let space = " ";
  if (!username.match(space)) {
    let args =
      "Username 👤 Must contain First Name and Last Name seperated by Space";
    displayerror(args, "username", "userlogo");
    return false;
  } else {
    document.querySelector(".userlogo").style.color = "green";
    access++;
  }

  //Password validation
  let number = password.match(/(\d+)/);
  if (!number || !(password.length > 5)) {
    let args =
      "Password 🔐 should be Greater then 5 digits and should contain different character and Numbers";
    displayerror(args, "password", "passlogo");
    return false;
  } else {
    document.querySelector(".passlogo").style.color = "green";
    access++;
  }
}

function displayerror(args, id, logo) {
  document.querySelector(
    ".warning p"
  ).textContent = `*** 🐜Error📢📢${args} ***`;
  document.getElementById(id).style["border-color"] = "red";
  document.querySelector("." + logo).style.color = "red";
  document.querySelector("p").style.color = "red";
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  //uppercasing the user name
  let name = document.getElementById("username").value;
  name = name.split(" ");
  const fname = name[0].charAt().toUpperCase() + name[0].slice(1);
  const lname = name[1].charAt().toUpperCase() + name[1].slice(1);
  name = fname + " " + lname;

  if (access === 2) {
    axios
      .post("/register", {
        name,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      })
      .then(function (response) {
        if (response.status === 201) {
          window.location.href = "/login";
        }
      })
      .catch(function (error) {
        //  console.log(error.response.data.errmsg)
        const errmsg = error.response.data.errmsg;
        const email = document.getElementById("email").value;
        // console.log(email)
        if (errmsg.includes(email)) {
          let args =
            "Looks like this Email 📧 is already taken or may be invalid";
          displayerror(args, "email", "emaillogo");
        }
      });
  }
  e.preventDefault();
});
