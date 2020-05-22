var x = localStorage.getItem("key");
console.log(x);
console.log(typeof x);
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
  console.log("inside getRes");
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${x}`,
          },
  });
  return response.json();
}


//user 

/* document.querySelector('.makereqfromname').addEventListener('click' , (e)=>{
  makereq()
  e.preventDefault()
})
document.querySelector('.makereqfrompic').addEventListener('click' , (e)=>{
  makereq()
  e.preventDefault()
})


function makereq(){
  console.log('req')
     fetch('/user', {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${x}`,
    },
  }).then(window.location.href ='/me')
  
} */