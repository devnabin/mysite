import { postData } from "./fetch.js";

//moduler Uicontroller
let uiController = (() => {
  //all classes and ids
  let domStrings = {
    errmsg: document.querySelector(".errmsg"), //error div
    spinner: document.querySelector(".spinner"), //spinning div
    postbut: document.getElementById("post-but"), //post button
    heading: document.getElementById("heading"), //heading input
    description: document.getElementById("description"), //description input
    pic: document.getElementById("blogpic"), //pic input / file type
  };

  //hiding dom content at first
  function hideDomContent() {
    domStrings.errmsg.style.display = "none";
    domStrings.spinner.style.display = "none";
  }

  //display domContent before post request
  function displayDomContent() {
    domStrings.spinner.style.display = "block";
  }

  //getting data from ui
  function getData() {
    return {
      heading: domStrings.heading.value,
      description: domStrings.description.value,
      pic: domStrings.pic.files[0],
    };
  }

  //showing error in heading , des and pic
  function showError(type, msg = "") {
    let errmsg;
    if (type == "heading") {
      domStrings[type].style["border-color"] = "red";
      errmsg = "Heading is too short";
    } else if (type == "description") {
      domStrings[type].style["border-color"] = "red";
      errmsg = "Description is too short";
    } else if (type == "pic") {
      errmsg = "Please add image for your Post";
    } else if (type == "server-msg") {
      errmsg = msg;
      //removing uploded pic from browser
      domStrings.pic.value = "";
    }

    //showing error message on ui
    domStrings.errmsg.style.display = "block";
    domStrings.errmsg.textContent = errmsg;
  }

  function markGreen(type) {
    if (type == "heading") {
      domStrings[type].style["border"] = "3px solid green";
    } else if (type == "description") {
      domStrings[type].style["border"] = "3px solid green";
    }
  }

  return {
    domStrings,
    hideDomContent,
    displayDomContent,
    getData,
    showError,
    markGreen,
  };
})();

//moudler data
let dataController = ((uiCtrl) => {
  //post make req for creating post
  function makeReq(data) {
    const url = "/blog";
    postData(url, "POST", data).then((res) => {
      if (res.error) {
        uiCtrl.hideDomContent();
        uiCtrl.showError("server-msg", res.error);
      } else {
        setTimeout(() => {
          window.location.href = "/blogs";
        }, 2000);
      }
    });
  }

  //getting post 
  function getPosts(){
    console.log('res')
      const url = '/blog';
      postData(url , "GET").then(res => console.log(res))
  }
  return {
    makeReq,
    getPosts,
  };
})(uiController);

//module controller
let controller = ((uiCtrl, dataCtrl) => {
  const domStrings = uiCtrl.domStrings;

  function postEvent() {
    //hiding element
    uiController.domStrings.errmsg.style.display = "none";

    //getting data
    const data = uiCtrl.getData();

    if (
      data.heading == "" ||
      data.heading.length <= 10 ||
      !data.heading.match(/( )/)
    ) {
      uiCtrl.showError("heading");
    } else if (
      data.description == "" ||
      data.description.length <= 50 ||
      !data.description.match(/( )/)
    ) {
      uiCtrl.markGreen("heading");
      uiCtrl.showError("description");
    } else if (!data.pic) {
      uiCtrl.markGreen("description");
      uiCtrl.showError("pic");
    } else {
      //appending data as a form data so that multer can easily passed in in backend
      let fd = new FormData();
      fd.append("upload", data.pic);
      fd.append("heading", data.heading);
      fd.append("description", data.description);

      //hiding warnings
      uiCtrl.hideDomContent();

      //showing spinners
      uiCtrl.displayDomContent();

      //making post request for a blog
      dataCtrl.makeReq(fd);
    }
  }

  function init() {
    //event listner setup
    domStrings.postbut.addEventListener("click", postEvent);

    //hiding dom element
    uiCtrl.hideDomContent();

    //getting first 5 posts
    dataCtrl.getPosts()
  }
  return {
    init,
  };
})(uiController, dataController);

controller.init();
