 const logusername = sessionStorage.getItem('username')
document.getElementById('username').textContent =  logusername


function check(){
    document.getElementById('error').textContent=  'click ';

    const randomNumber = document.getElementById('checkval').textContent
    const typedNumber  = document.getElementById('typedtext').value
    console.log(typedNumber)
    console.log(typeof typedNumber)
    console.log(randomNumber)
    console.log(typeof randomNumber)

    
    if(!typedNumber) return invalid('Please Enter the Correct Given Code below')
    if(randomNumber===typedNumber){
        localStorage.setItem('username' , logusername)
        sessionStorage.removeItem('username')
        window.location.href='/'
    }else{
       return invalid('You Have enter the invalid code , Please try again')
    }
}

function invalid(args){
    document.getElementById('error').textContent=  args;
  document.getElementById('error' ).classList.add("add");

}