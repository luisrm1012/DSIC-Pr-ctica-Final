const URL = "http://127.0.0.1:4000/";

let userData = [];

/*const form = document.querySelector("form");
form.addEventListener("submit", login);*/

async function login(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const myObject = Object.fromEntries(data.entries());

  let email = myObject.email;
  let password = myObject.password;

  await fetch(URL + email + "&" + password) //API URL
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

  console.log(data);

  let postOptions = {
    method: "POST",
    body: { myObject },
  };

  await fetch(URL + "newCliente", {
    method: "POST",
    body: { myObject },
  }) //API URL
    .then((response) => response.json())
    .then((data) => {
      userData = data;
    })
    .catch((error) => console.log("error", error));
}

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
