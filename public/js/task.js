let showtask, createdElm, prv;

function init(){
  // document.querySelector('.current-task').style.display = 'none'
  // document.querySelector('.completed-task').style.display= "none"

}

init();
document.getElementById("addtask-button").addEventListener("click", () => {
  const task = document.getElementById("task").value;
  const add = document.querySelector('.current-task')
  if (task) {
    if (prv === task) return console.log(`same task is n't added `);
    prv = task;
    const replace =  manupu(task);
    document.querySelector('.current-task').style.display = "block"
    add.insertAdjacentHTML('beforeend', replace);
  }
});



function manupu(task){
let html = '<div class="mytask"><div> <span class="task-content">1</span>. <span class="task-content">%  %</span> </div><button class="del-but"><span class="material-icons">create</span></button><button class="del-but"><span class="material-icons">delete</span></button></div>'
let newhtml = html.replace('%  %' , task)
return newhtml
}
document.querySelector('.del').addEventListener('click', ()=> {
  document.querySelector('.del').style.transform = `translateX(130px)`


})


