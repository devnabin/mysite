function validateForm() {
  //empty path
  document.querySelector("p").textContent = "";

  const username = document.forms["myForm"]["username"].value;
  const password = document.forms["myForm"]["password"].value;
  const email = document.forms["myForm"]["email"].value;

  //User Name validation
  let space = " ";
  if (!username.match(space)) {
    let args =
      "Username 👤 Must contain First Name and Last Name seperated by Space";
    displayerror(args);
    return false;
  }

  //Password validation
  let number = password.match(/(\d+)/);
  if ((!number) || !(password.length > 5)) {
    let args =
      "Password 🔐 should be Greater then 5 digits and should contain different character and Numbers";
    displayerror(args);
    return false;
  }


}

function displayerror(args) {
  document.querySelector("p").textContent = `*** 🐜Error📢📢${args} ***`;
  document.querySelector("p").classList.add("p");
}
