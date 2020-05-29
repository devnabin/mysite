//DataStructure
let dataController = (function () {

  //Constructure to give structure 
  function Task(id, data) {
    this.id = id;
    this.task = data;
  }

  //Storing Data
  let data = {
    task:{
      currentTask : [],
      completedTask : []
    }
  };

  //Customizing to pass in function constructure
  function loadData(task) {
    let id, newTask;
    if (data.task.currentTask.length > 0) {
      id = data.task.currentTask[data.task.currentTask.length - 1].id + 1;
    } else {
      id = 0;
    }

    newTask = new Task(id, task);
    data.task.currentTask.push(newTask);

    return newTask;
  }

  //returing data
  return {
   loadData,
   data : data.task,
  }
})();


//ui Controller
let uiController = (function () {
  
  //id and Classes 
  let DomStrings = {
    addTaskButton: "#addtask-button",
    inputValue: "#task",
    currentTask : ".current-task",
  };
  
  //Get Task from input 
  let inputData = function () {
    return document.querySelector(DomStrings.inputValue).value;
  };

  //Display User-task in Browser
  let displayTaskForUser = function({id , task}){
    let html , newhtml;
    html =  '<div class="mytask" id="mytask-%mainid%"><div> <span class="task-content">%displaying-id%</span>. <span class="task-content">%task%</span> </div><button class="action-but crt"><span class="material-icons">create</span></button><button class="action-but del"><span class="material-icons">delete</span></button></div>';
    html = html.replace('%mainid%',id)
    html = html.replace('%displaying-id%',id)
    newhtml = html.replace("%task%", task);
    document.querySelector(DomStrings.currentTask).insertAdjacentHTML("beforeend", newhtml);
  }

  //returing 
  return {
    DomStrings,
    inputData: inputData,
    displayTaskForUser,
  };
})();



//Controller
let Controller = (function (dataCtrl, uiCtrl) {
  //
  function runEvent() {
    let inputData , taskObj;
    
    // 1 Get the fill inpute data
     inputData = uiCtrl.inputData();  
     if(!(inputData.length>=3))return alert('task name is too short')
     
      // 2 Add the iteam to the data controller
     taskObj = dataCtrl.loadData(inputData)
    
    // 3 Add the item to the UI
     uiCtrl.displayTaskForUser(taskObj)

    // 4 Calculate the budget

    // 5 Display the budget to the Ui
  }

  //
  function init() {
    const Dom = uiCtrl.DomStrings;
    document
      .querySelector(Dom.addTaskButton)
      .addEventListener("click", runEvent);
    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which == 13) {
        runEvent();
      }
    });
  }

  //returning
  return {
    init: init,
  };
})(dataController, uiController);

Controller.init();
