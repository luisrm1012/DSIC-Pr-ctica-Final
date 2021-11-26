const URL = "http://127.0.0.1:4000/";

let userData = [];

/*const form = document.querySelector("form");
form.addEventListener("submit", login);*/

/*
<-------------------- Cliente -------------------->
*/

async function login(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const myObject = Object.fromEntries(data.entries());

  let email = myObject.email;
  let password = myObject.password;
  let type = myObject.tipo;

  await fetch(URL + email + "&" + password + "&" + type) //API URL
    .then((response) => response.json())
    .then((data) => {
      userData = data;
    })
    .catch((error) => console.log("error", error));

  if (userData.email == email) {
    window.location.href = "home.html";
  }
}

async function registerCliente(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const myObject = Object.fromEntries(data.entries());

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let postOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(myObject),
  };

  await fetch(URL + "newCliente", postOptions) //API URL
    .then((response) => response.json())
    .then((data) => {
      userData = data;
    })
    .catch((error) => console.log("error", error));
}

/*
<-------------------- Restaurante Requests -------------------->
*/

async function registerRestaurante(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const myObject = Object.fromEntries(data.entries());

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let postOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(myObject),
  };

  await fetch(URL + "newRestaurante", postOptions) //API URL
    .then((response) => response.json())
    .then((data) => {
      userData = data;
    })
    .catch((error) => console.log("error", error));
}

/*
<-------------------- ALL -------------------->
*/

async function getUserName() {
  var myData;
  await fetch(URL + "loggedUser") //API URL
    .then((response) => response.json())
    .then((data) => {
      myData = data;
    })
    .catch((error) => console.log("error", error));

  document.getElementById("hi-user").innerHTML = myData.email;
}
