//DataStructure
let dataController = (function () {
  //Constructure to give structure
  function Task(id, data) {
    this.id = id;
    this.task = data;
    // this.complete = false;
  }

  //Storing Data
  let data = {
    task: {
      currentTask: [],
      completedTask: [],
    },
  };


  (() => {
    let localdata, count;
    localdata = JSON.parse(localStorage.getItem("data"));
    console.log("local data ", localdata);
    if (localdata) {
      count = countNumberOfTask(localdata);
      if (count.CompletedNumber > 0) {
        localdata.task.completedTask.forEach((element) => {
          data.task.completedTask.push(element);
        });
      }
      if (count.CurrentNumber > 0) {
        localdata.task.currentTask.forEach((element) => {
          data.task.currentTask.push(element);
        });
      }
    }
  })();


  function Savedata() {
    localStorage.setItem("data", JSON.stringify(data));
  }

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

    Savedata();

    return newTask;
  }

  //mark Complete Task
  function currentToComplete(id) {
    let getdata = data.task.currentTask.filter((val) => val.id == id);
    let getAnotherData = data.task.currentTask.filter((val) => val.id != id);
    getdata = getdata[0];
    data.task.completedTask.push(getdata);
    data.task.currentTask = getAnotherData;

    Savedata();

    return getdata;
  }

  //deleting task permanently
  function deleteTaskFromData(id) {
    let getAnotherData = data.task.completedTask.filter((val) => val.id != id);
    data.task.completedTask = getAnotherData;

    Savedata();
  }

  //number of completed and and current task
  function countNumberOfTask(workondata = data) {
    //default parameter
    let CompletedNumber, CurrentNumber;

    CurrentNumber = workondata.task.currentTask.length;
    CompletedNumber = workondata.task.completedTask.length;

    return {
      CompletedNumber,
      CurrentNumber,
    };
  }
  //returing data
  return {
    loadData,
    data,
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

  //Clear Task from input field after task receive
  let clearInputFields = function () {
    document.querySelector(DomStrings.inputValue).value = "";
  };


  //Display User-task in Browser
  let displayTaskForUser = function ({ id, task }, taskStatus) {
    let html, newhtml, where;
    if (taskStatus == "current") {
      html =
        '<div class="mytask" id="mytask-%mainid%"><div><span class="task-content">%displaying-id%</span>.<span class="task-content">%task%</span></div><button class="crt edit"><span class="material-icons">create</span></button><button class="done crt"><span class="material-icons">check_circle</span></button></div>';
      where = DomStrings.currentTask;
    } else if (taskStatus == "completed") {
      html =
        '<div class="mytask" id="mytask-%mainid%"><div><span class="task-content">%displaying-id%</span>.<span class="task-content">%task%</span></div><button class="crt redo"><span class="material-icons">replay</span></button><button class="del crt"><span class="material-icons">delete</span></button></div>';
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
    inputData,
    clearInputFields,
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

    //removing task name from input fields after getting it
    uiController.clearInputFields();

    // 2 Add the iteam to the data controller
    taskObj = dataCtrl.loadData(inputData);

    // 3 Add the item to the UI
    uiCtrl.displayTaskForUser(taskObj, "current");
    rendringUI(false)
   
    // 4 Calculate the budget

    // 5 Display the budget to the Ui
  }

  //runEventTo mark task from current to complete , remove task , etc 
  function runEventToDo(e) {
    let what, tar, value, completedTask;
    what = e.target.parentNode.className;
    tar = e.target.parentNode.parentNode.id;
    value = tar.split("-");
    // console.log(what)
    if (what) {
      if (what.includes("edit")) {
        console.log("edit-task");
      } else if (what.includes("done")) {
        //update data in datacontroller i.e current task to completed task
        completedTask = dataCtrl.currentToComplete(value[1]);

        //removing from current task
        deletingFrom(tar);

        //adding to completed task
        uiCtrl.displayTaskForUser(completedTask, "completed");
      } else if (what.includes("redo")) {
        console.log("restore-task");
      } else if (what.includes("del")) {
        //delete From data structure
        dataController.deleteTaskFromData(value[1]);

        //delete from ui
        deletingFrom(tar);
      }
    }

    function deletingFrom(tar) {
      uiCtrl.deleteTaskFromUi(tar);
    }
    rendringUI(false) 
  }

  //rendring Ui
  function rendringUI(reRender) {
    let counts;
    counts = dataCtrl.countNumberOfTask();
    if (counts) {
      uiCtrl.displayNumberOfTask(counts.CurrentNumber, counts.CompletedNumber);
    }
    if (counts.CurrentNumber == 0 && counts.CompletedNumber === 0) {
      localStorage.removeItem("data");
    }

    if (reRender) {
      if (counts.CurrentNumber > 0) {
        dataCtrl.data.task.currentTask.forEach((element) =>
          uiController.displayTaskForUser(element, "current")
        );
      }
      if (counts.CompletedNumber > 0) {
        dataCtrl.data.task.completedTask.forEach((element) =>
          uiController.displayTaskForUser(element, "completed")
        );
      }
    }
  }

  //instilizing
  function init() {
    //rendring the previous data on open browser
    rendringUI(true);

    //taking task as input event
    document
      .querySelector(Dom.addTaskButton)
      .addEventListener("click", runEvent);
    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which == 13) {
        runEvent();
      }
    });

    //modifying taskes (make task , current to complete , delete task ) and make events
    document
      .querySelector(Dom.showtask)
      .addEventListener("click", runEventToDo);
  }

  //returning
  return {
    init: init,
  };
})(dataController, uiController);

Controller.init();

