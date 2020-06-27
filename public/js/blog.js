import { postData } from "./fetch.js";

//moduler Uicontroller
let uiController = (() => {
  //all classes and ids
  let domStrings = {
    //for add post page =================================================================================================================
    errmsg: document.querySelector(".errmsg"), //error div
    spinner: document.querySelector(".spinner"), //spinning div
    postbut: document.getElementById("post-but"), //post button
    heading: document.getElementById("heading"), //heading input
    description: document.getElementById("description"), //description input
    pic: document.getElementById("blogpic"), //pic input / file type
    //for blog page /blogs------------------------------------------------------------------------------------------------------------------
    showmorediv: document.querySelector(".showmoreDiv"),
    nopostdiv: document.querySelector(".noPostFound"),
    renderingdiv: document.querySelector(".rendring"),
    bodydiv: document.querySelector(".bodydiv"),
  };

  //hiding dom content at first
  function hideDomContent() {
    //for add post page =================================================================================================================
    domStrings.errmsg.style.display = "none";
    domStrings.spinner.style.display = "none";
    //for blog page /blogs------------------------------------------------------------------------------------------------------------------
    domStrings.showmorediv.style.display = "none";
    domStrings.nopostdiv.style.display = "none";
  }
  //for add post page =================================================================================================================
  //display domContent before post request
  function displayDomContent(arg) {
    domStrings[arg].style.display = "block";
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

  //for blog page /blogs------------------------------------------------------------------------------------------------------------------
  function renderPost(obj) {
    // console.log(obj)
    let html;
    // html = `<div class="apost d-flex" id="%id%"><img src="%img%"alt="" /><div><span> <i class="fa fa-user" aria-hidden="true"></i>%userpost%</span><span> <i class="fa fa-calendar" aria-hidden="true"></i>%postdate%</span></div><div class="content"><h5 class="heading">%heading%</h5><p>%des%</p></div></div>`;
    html = `<div class="apost d-flex" id="%id%"><img src="%img%" alt=""><div class="content"><div><span> <i class="fa fa-user" aria-hidden="true"></i>%userpost%</span><span> <i class="fa fa-calendar" aria-hidden="true"></i>%postdate%</span></div><h5 class="heading">%heading%</h5><p>%des%</p></div></div>`;

    // html = `<div class="apost d-flex" id="%id%"><img src="%img%"alt="" /><div class="content"><h5 class="heading">%heading%</h5><p>%des%</p></div></div>`;
    html = html.replace("%id%", obj._id);
    html = html.replace("%img%", `/blog/image/${obj._id}`);
    html = html.replace("%heading%", obj.heading);
    html = html.replace("%des%", obj.description);
    //===
    let time = obj.createdAt.split("T");
    html = html.replace("%userpost%", obj.postowner);
    html = html.replace("%postdate%", time[0]);

    domStrings.renderingdiv.insertAdjacentHTML("afterbegin", html);
  }

  //showing post
  function showPost() {}

  return {
    domStrings,
    hideDomContent,
    displayDomContent,
    getData,
    showError,
    markGreen,
    renderPost,
    showPost,
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
  function getPosts() {
    const url = "/blog";

    postData(url, "GET").then((res) => {
      console.log(res);
      if (res.length >= 5) {
        uiCtrl.displayDomContent("showmorediv");
      }
      res.forEach((el) => {
        uiController.renderPost(el);
      });
    });
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
      uiCtrl.displayDomContent("spinner");

      //making post request for a blog
      dataCtrl.makeReq(fd);
    }
  }

  function postEventTo(e) {
    let blogid;
    if (e.target.parentElement.id) {
      blogid = e.target.parentElement.id;
    } else if (e.target.parentElement.parentElement.id) {
      blogid = e.target.parentElement.parentElement.id;
    }

    if (blogid) {
      localStorage.setItem("blogid", blogid);
      window.location.href = "/blogs/post";
    }
  }

  //removing local storage data
  function removeData() {
    if (localStorage.getItem("blogid")) {
      localStorage.removeItem("blogid");
    }
  }

  function init() {
    //event listner setup
    domStrings.postbut.addEventListener("click", postEvent);

    //removing localstorage data if have
    removeData();

    //event lister to individual post
    uiCtrl.domStrings.bodydiv.addEventListener("click", postEventTo);

    //hiding dom element
    uiCtrl.hideDomContent();

    //getting first 5 posts
    dataCtrl.getPosts();
  }
  return {
    init,
  };
})(uiController, dataController);

controller.init();

//<div class="apost d-flex" id=""><img src="%img%" alt=""><div class="content"><div><span> <i class="fa fa-user" aria-hidden="true"></i>%userpost%</span><span> <i class="fa fa-calendar" aria-hidden="true"></i>%postdate%</span></div><h5 class="heading">%heading%</h5><p>%des%</p></div></div>
