//DataStructure or data module (1) ================================================================================================================
let dataController = (function () {
  //Constructure to give structure
  function Task(id, data) {
    this.id = id;
    this.task = data;
    this.complete = false;
  }

  //Storing Data || main data container
  let data = {
    task: {
      currentTask: [], //contain the current and remaining task
      completedTask: [], //contain the complected task
    },
    allCreatedtaskes: [], //its save all the taskes removed as well
  };

  //adding localstorage data to data object just above
  (() => {
    let localdata, count;
    //getting data from local storage
    localdata = JSON.parse(localStorage.getItem("data"));
    if (localdata) {
      //count the no. of task on localstorage if there is any task then it add to the main data container
      count = countNumberOfTask(localdata);
      if (count.CompletedNumber > 0) {
        //adding completed task from local storage to main data container
        localdata.task.completedTask.forEach((element) => {
          data.task.completedTask.push(element);
        });
      }
      if (count.CurrentNumber > 0) {
        //adding current nd remaining task from local storage to main data container
        localdata.task.currentTask.forEach((element) => {
          data.task.currentTask.push(element);
        });
      }
    }
  })();

  //this Savedata function will save the data container data to the local storage every time when its call
  function Savedata() {
    localStorage.setItem("data", JSON.stringify(data));
  }

  //converting the user input task into object for processing data
  function loadData(task) {
    let id, newTask;
    if (data.allCreatedtaskes.length > 0) {
      //the number or task number of new task will be assign from the last new task
      id = data.allCreatedtaskes[data.allCreatedtaskes.length - 1].id + 1;
    } else {
      //the first task will be task 0
      id = 0;
    }

    newTask = new Task(id, task); //create new object for new task
    data.task.currentTask.push(newTask); //adding task to remaining task or current task
    data.allCreatedtaskes.push(newTask); //adding task to all the task

    //the the data to local storage
    Savedata();

    return newTask;
  }

  //mark Complete Task || it marks the current task to completed task
  function currentToComplete(id) {
    let getdata = data.task.currentTask.filter((val) => val.id == id);
    getdata = getdata[0]; //thus filter method return array so we can get object from getdata[0] or array notation
    let getAnotherData = data.task.currentTask.filter((val) => val.id != id);
    data.task.completedTask.push(getdata); //it add the that task to completed task array in data container
    data.task.currentTask = getAnotherData; //it store all the task except that task after filtering

    //the the data to local storage
    Savedata();

    return getdata;
  }

  //deleting task permanently
  function deleteTaskFromData(id) {
    //its deleted  the task permanently from completed task
    let getAnotherData = data.task.completedTask.filter((val) => val.id != id);
    data.task.completedTask = getAnotherData;

    //the the data to local storage
    Savedata();
  }

  //this funtion return the number of completed and and current task
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
    data, //main data structure or data container
    loadData,
    currentToComplete,
    countNumberOfTask,
    deleteTaskFromData,
  };
})();

//ui Controller module (2) ====================================================================================================
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
  //show the number of current task and completed task
  function displayNumberOfTask(current_count, completed_count) {
    document.querySelector(
      DomStrings.current_task_count
    ).textContent = current_count;
    document.querySelector(
      DomStrings.completed_task_count
    ).textContent = completed_count;
  }

  //Get Task name  from input filed
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
      //making html for current task filed
      html =
        '<div class="mytask" id="mytask-%mainid%"><div><span class="task-content">%displaying-id%</span>.<span class="task-content">%task%</span></div><button class="crt edit"><span class="material-icons">create</span></button><button class="done crt"><span class="material-icons">check_circle</span></button></div>';
      where = DomStrings.currentTask;
    } else if (taskStatus == "completed") {
      html =
        //making html for completed task fields
        '<div class="mytask" id="mytask-%mainid%"><div><span class="task-content">%displaying-id%</span>.<span class="task-content">%task%</span></div><button class="crt redo"><span class="material-icons">replay</span></button><button class="del crt"><span class="material-icons">delete</span></button></div>';
      where = DomStrings.completedTask;
    }

    html = html.replace("%mainid%", id);
    html = html.replace("%displaying-id%", id);
    newhtml = html.replace("%task%", task);

    //adding html content to browser
    document.querySelector(where).insertAdjacentHTML("beforeend", newhtml);
  };

  //

  //Deleting task from ui after clicking delete button on ui
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

//Controller module (3) ======================================================================================
let Controller = (function (dataCtrl, uiCtrl) {
  //Dom id and Classes selector
  const Dom = uiCtrl.DomStrings;

  //main ui Event
  function runEvent() {
    let inputData, taskObj;

    //Getting the task from ui controller
    inputData = uiCtrl.inputData();
    if (!(inputData.length >= 3)) return alert("task name is too short");

    //removing task name from input fields after getting it
    uiController.clearInputFields();

    //Add the task to the data controller to make an object
    taskObj = dataCtrl.loadData(inputData);

    //Add the current task item to the UI
    uiCtrl.displayTaskForUser(taskObj, "current");
    rendringUI(false);
  }

  //runEventTo mark task from current to complete , remove task , etc
  function runEventToDo(e) {
    let what, tar, value, completedTask;

    what = e.target.parentNode.className;
    //what contain the class name of parent element of the clicked target

    tar = e.target.parentNode.parentNode.id;
    //tar contain the grandprant id

    value = tar.split("-");
    //splite string method is used splite the string from any point (here we give dash `-`)  and converts to array

    if (what) {
      if (what.includes("edit")) {
        console.log("edit-task");
      } else if (what.includes("done")) {
        //update data in datacontroller i.e current task to completed task
        completedTask = dataCtrl.currentToComplete(value[1]);

        //removing from current task ui
        deletingFrom(tar);

        //after removing from current task ui adding to completed task ui
        uiCtrl.displayTaskForUser(completedTask, "completed");

      } else if (what.includes("redo")) {
        console.log("restore-task");
      } else if (what.includes("del")) {
        //delete From data structure or data container strucutre
        dataController.deleteTaskFromData(value[1]);

        //delete from whole ui
        deletingFrom(tar);
      }
    }

    function deletingFrom(tar) {
      uiCtrl.deleteTaskFromUi(tar);
    }
    rendringUI(false);
  }

  //rendring Ui
  function rendringUI(reRender) {
    let counts;
    counts = dataCtrl.countNumberOfTask(); //getting number of current task and completed task
    
    if (counts) {
      uiCtrl.displayNumberOfTask(counts.CurrentNumber, counts.CompletedNumber);
      //showing number of current task and completed task in ui
    }

    if (counts.CurrentNumber == 0 && counts.CompletedNumber === 0) {
      localStorage.removeItem("data");
      //when number of current task and completed task in zero , then tha data will be removed from local storage
    }

    //render the current task and completed task after window or tab refresh 
    //local storage > data strucutre > from the help of data structure of data container we rerender the ui just before the tab or window closed
    if (reRender) {
      if (counts.CurrentNumber > 0) {
        //rendring the ui at current task
        dataCtrl.data.task.currentTask.forEach((element) =>
          uiController.displayTaskForUser(element, "current")
        );
      }
      if (counts.CompletedNumber > 0) {
        //rendring the ui at completed task
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

    //instilizing eventlistner to the browser and taking task as input event
    document
      .querySelector(Dom.addTaskButton)
      .addEventListener("click", runEvent);
    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which == 13) {
        runEvent();
      }
    });

    //modifying taskes (make task ,mark current task to complete , delete task ) and make many more events
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
