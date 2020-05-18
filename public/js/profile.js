/* const popUp = document.getElementById("popup");
const mainPopUp = document.getElementById("main-popup");
const msgBox = document.getElementById('notifi')

//window instilization
init();
function init() {
  popUp.classList.remove("test");
  mainPopUp.classList.remove("testing");
}



//adding css
function addStyle(height, width) {
  popUp.classList.add("test");
  mainPopUp.classList.add("testing");
  msgBox.classList.add('warnmsg')
  mainPopUp.style.height = height + 'px';
  mainPopUp.style.width = width + 'px';
}

//message
function giveWarningmsg(msg){
    msgBox.textContent = msg

} */



const goBack = document.getElementById("return");
const menu = document.getElementById("menu");
const logout = document.getElementById("logout");
const update = document.getElementById("update");
const deleteAccoutn = document.getElementById("deleteAccount");

//1
//return go back
goBack.addEventListener("click", () => {
  window.location.href = "/";
});

//2
//Logout
logout.addEventListener("click", () => {
//    addStyle('600' , '400')    for update
// addStyle('300' , '600')
// giveWarningmsg('Are you secure want to logout')

});
