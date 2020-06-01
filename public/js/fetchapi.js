let getdata = async function (url, method, data = {}) {
  try {
    let dummy;
    if(method !== 'GET'){
    dummy = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${x}`,
      },
      body:JSON.stringify(data),
    });
  }else{
    dummy = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${x}`,
      },
    });
  }
    dummy = await dummy.json();
    return dummy;
  } catch (error) {
    console.log(error);
  }
};

export { getdata };


// import { getdata } from "./fetchapi.js";
  
//Server Connection or Server Module (2)=======================================================
/* let serverTalk = (function (dataCtrl) {
  getdata("/me/mytask", "GET")
    .then((response) =>
      response.forEach((args) => {
        dataCtrl.data.allCreatedtaskes.push(args);
        console.log(args)
      })
    )
    .catch((error) => console.log(error));

  return {};
})(dataController); */