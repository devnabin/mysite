
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



const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
const newName = document.getElementById('newUserName').value 
const bio = document.getElementById('bio').value 
console.log(newName ,bio)
const  url = `http://localhost:3000/me/update`
const data ={
  newName ,
  bio
}
fetch(url, {
  method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json',
    'Authentication' : 'Barer tokensdafasdf123'
    // 'Accept': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
     body: JSON.stringify(data) // body data type must match "Content-Type" header
})

.then(data => {
  console.log(data)
  if(data.status == 200){
    console.log('ok data is good')
  }
    return data.json(); // JSON data parsed by `response.json()` call
  })
  .then(data =>{
    if(data.status == 200){
      console.log('ok data is good')
    }
     console.log(data)
  })
.catch(error => console.log(error))


  e.preventDefault();
});



//logout
const logoutbut = document.getElementById('logoutbut')
logoutbut.addEventListener('click' ,()=>{
  const one = document.getElementById('log-out').checked
  const two =document.getElementById('log-out-all').checked
  if(one && two){
    const  url = `http://localhost:3000/me/logouts`
    fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    }).then(res =>{
      console.log(res)
      return res.json()
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))
  }
  console.log(one ,two)
})

// document.querySelector('.messageCheckbox').checked;




