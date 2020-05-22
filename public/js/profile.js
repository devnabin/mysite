const goBack = document.getElementById("return");
const menu = document.getElementById("menu");
const logout = document.getElementById("logout");
const update = document.getElementById("update");
const deleteAccout = document.getElementById("deleteAccount");

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
  } else if (one || two) {
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
const deleteAcc = document.getElementById('deletebut')
deleteAcc.addEventListener('click' , ()=>{
  const chk = document.getElementById("delete-account").checked;
  if(chk){
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

})



//password
document.getElementById('makePassChange').addEventListener('click' , (e)=>{
  const oldpass = document.getElementById('oldpass').value 
  const newpass1 = document.getElementById('newpass1').value 
  const newpass2 = document.getElementById('newpass2').value 
  if(oldpass && newpass1 && newpass2 ){
    console.log(oldpass , newpass1  , newpass2)
    if(newpass1 === newpass2){
      const url = `/user/update`;
      const method = "PATCH";
      const data ={ password :{
        oldpass,
        newpass1
      },
      name : 'salina gomez' , 
      bio : "hello World" ,
      chk : 'ahsdfk'
      }
      makeReq(url, method , data)
      .then((data) => {
        console.log(data);
      })
      .catch((error) =>console.log(error));
    }else{
      console.log('please enter the same Password')
    }

  }else{
    console.log('error')
  }
e.preventDefault()
})


async function makeReq(url, method , data = {}) {
  try {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${x}`,
    },
    body: JSON.stringify(data) 
  });
  return response.json();
    
  } catch (error) {
   return error.json();
  }
    
}

/* async function makeReq(url, method) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${x}`,
    },
  });
  return response.json();
}
 */