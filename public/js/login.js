import { response } from "express"

console.log('hello world')

const form = document.querySelector('form')
form.addEventListener('submit', ()=>{
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    if(email && password){
        axios.post('/login', {
            email : email,
            password : password,
        })
        .then(response =>{
            console.log(response)
        })
        .catch(error =>{
            const errmsg =  error.response.data.errmsg;
            console.log(errmsg)
        })
    }
})