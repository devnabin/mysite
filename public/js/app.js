 var x = document.cookie;
if(x.includes('token')){
  console.log('user is active')

  document.querySelector('.loginButton').href="/me"; 
  document.querySelector('.loginButtonImg').href="/me"; 

  document.getElementById('logText').textContent="Nabin Bhandari";  
  // document.querySelector('.loginButton').src="//media/img/mypic.jpg"; 

  
 
}
