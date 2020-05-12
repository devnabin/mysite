 //Registration Form validation
 function validateForm() {
 
    document.querySelector("p").textContent = "";
    document.getElementById('username').style['border-color']= 'black';
    document.getElementById('password').style['border-color']= 'black';
    document.querySelector('.userlogo').style.color = 'black';
    document.querySelector('.passlogo').style.color = 'black';
 

    const username = document.forms["myForm"]["username"].value;
    const password = document.forms["myForm"]["password"].value;


    //User Name validation
    let space = " ";
    if (!username.match(space)) {
      let args =
        "Username 👤 Must contain First Name and Last Name seperated by Space";
      displayerror(args , 'username' , 'userlogo');
      return false;
    }
  
    //Password validation
    let number = password.match(/(\d+)/);
    if ((!number) || !(password.length > 5)) {
      let args =
        "Password 🔐 should be Greater then 5 digits and should contain different character and Numbers";
      displayerror(args , 'password' , 'passlogo');
      return false;
    }

  }
  
  function displayerror(args , id , logo) {
    document.querySelector(".warning p").textContent = `*** 🐜Error📢📢${args} ***`;
    document.getElementById(id).style['border-color']= 'red';
    document.querySelector('.' + logo).style.color = 'red';

  } 

