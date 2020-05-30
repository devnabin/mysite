//DataStructure
let dataController = (function () {
  //Constructure to give structure
  function Task(id, data) {
    this.id = id;
    this.task = data;
  }

  //Storing Data
  let data = {
    task: {
      currentTask: [],
      completedTask: [],
    },
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

  //mark Complete Task
  function currentToComplete(id) {
    let getdata = data.task.currentTask.filter((val) => val.id == id);
    let getAnotherData = data.task.currentTask.filter((val) => val.id != id);
    getdata = getdata[0];
    data.task.completedTask.push(getdata);
    data.task.currentTask = getAnotherData;
    return getdata;
  }

  //deleting task permanently
  function deleteTaskFromData(id) {
    let getAnotherData = data.task.completedTask.filter((val) => val.id != id);
    data.task.completedTask = getAnotherData;
  }

  //number of completed and and current task
  function countNumberOfTask() {
    let CompletedNumber, CurrentNumber;
    CurrentNumber = data.task.currentTask.length;
    CompletedNumber = data.task.completedTask.length;
    return {
      CompletedNumber,
      CurrentNumber,
    };
  }
  //returing data
  return {
    loadData,
    data: data.task,
    currentToComplete,
    countNumberOfTask,
    deleteTaskFromData,
  };
})();

//ui Controller
let uiController = (function () {
  //id and Classes
  let DomStrings = {
    addTaskButton: "#addtask-button",
    inputValue: "#task",
    currentTask: ".current-task",
    completedTask: ".completed-task",
    showtask: ".showtask",
    current_task_count: "#current-task-count",
    completed_task_count: "#completed-task-count",
  };

  //displaying task-Count to Client
  function displayNumberOfTask(current_count, completed_count) {
    document.querySelector(
      DomStrings.current_task_count
    ).textContent = current_count;
    document.querySelector(
      DomStrings.completed_task_count
    ).textContent = completed_count;
  }

  //Get Task from input
  let inputData = function () {
    return document.querySelector(DomStrings.inputValue).value;
  };

  //Display User-task in Browser
  let displayTaskForUser = function ({ id, task }, taskStatus) {
    let html, newhtml, where;
    if (taskStatus == "current") {
      html =
        '<div class="mytask" id="mytask-%mainid%"><div><span class="task-content">%displaying-id%</span>.<span class="task-content">%task%</span></div><button class="crt"><span class="material-icons">create</span></button><button class="done"><span class="material-icons">check_circle</span></button></div>';
      where = DomStrings.currentTask;
    } else if (taskStatus == "completed") {
      html =
        '<div class="mytask" id="mytask-%mainid%"><div><span class="task-content">%displaying-id%</span>.<span class="task-content">%task%</span></div><button class="crt"><span class="material-icons">replay</span></button><button class="del"><span class="material-icons">delete</span></button></div>';
      where = DomStrings.completedTask;
    }

    html = html.replace("%mainid%", id);
    html = html.replace("%displaying-id%", id);
    newhtml = html.replace("%task%", task);
    document.querySelector(where).insertAdjacentHTML("beforeend", newhtml);
  };

  //

  //Deleting task permanently
  let deleteTaskFromUi = function (id) {
    let el = document.getElementById(`${id}`);
    el.parentNode.removeChild(el);
  };

  //returing
  return {
    DomStrings,
    inputData: inputData,
    displayTaskForUser,
    deleteTaskFromUi,
    displayNumberOfTask,
  };
})();

//Controller
let Controller = (function (dataCtrl, uiCtrl) {
  //Dom id and Classes selector
  const Dom = uiCtrl.DomStrings;

  //main ui Event
  function runEvent() {
    let inputData, taskObj;

    // 1 Get the fill inpute data
    inputData = uiCtrl.inputData();
    if (!(inputData.length >= 3)) return alert("task name is too short");
    document.querySelector(Dom.inputValue).value = "";

    // 2 Add the iteam to the data controller
    taskObj = dataCtrl.loadData(inputData);

    // 3 Add the item to the UI
    uiCtrl.displayTaskForUser(taskObj, "current");
    ClearUI();

    // 4 Calculate the budget

    // 5 Display the budget to the Ui
  }

  //runEventToDelete
  function runEventToDo(e) {
    let what, tar, value, completedTask;
    what = e.target.parentNode.className;
    tar = e.target.parentNode.parentNode.id;
    value = tar.split("-");
    // console.log(what)
    if (what) {
      if (what.includes("edit-task")) {
        console.log("edit-task");
      } else if (what === "done") {
        //update data in datacontroller i.e current task to completed task
        completedTask = dataCtrl.currentToComplete(value[1]);

        //removing from current task
        deletingFrom(tar);

        //adding to completed task
        uiCtrl.displayTaskForUser(completedTask, "completed");
      } else if (what.includes("restore-task")) {
        console.log("restore-task");
      } else if (what === "del") {
        //delete From data structure
        dataController.deleteTaskFromData(value[1])

        //delete from ui
            //making delete button animation
            document.querySelector('.del').style.transform = 'translateX(130px)'
            //acutally deleting from ui
            setTimeout(()=>{
              deletingFrom(tar);
            },400)
      }
    }

    function deletingFrom(tar) {
      uiCtrl.deleteTaskFromUi(tar);
    }
    ClearUI();
  }

  //Clear Ui
  function ClearUI() {
    let counts;
    document.querySelector(Dom.current_task_count).textContent = "";
    document.querySelector(Dom.completed_task_count).textContent = "";
    counts = dataCtrl.countNumberOfTask();
    if (counts) {
      uiCtrl.displayNumberOfTask(counts.CurrentNumber, counts.CompletedNumber);
    }
  }

  //instilizing
  function init() {
    //clear the dom Content First time
    ClearUI();

    //taking task as input event
    document
      .querySelector(Dom.addTaskButton)
      .addEventListener("click", runEvent);
    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which == 13) {
        runEvent();
      }
    });

    //modifying taskes and make events
    document
      .querySelector(Dom.showtask)
      .addEventListener("click", runEventToDo);

    //Showing task Count
  }

  //returning
  return {
    init: init,
  };
})(dataController, uiController);

Controller.init();
