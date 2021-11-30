const URL = "http://127.0.0.1:4000/";


/*
<-------------------- Cliente -------------------->
*/

async function login(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const myObject = Object.fromEntries(data.entries());

  let email = myObject.email;
  let password = myObject.password;
  let userData; // = null;
  let statusCode;

  if (email == "" || password == "") {
    alert("Por favor rellena el formulario.");
    return;
  }

  await fetch(URL + email + "&" + password) //API URL
    .then((response) => {
      statusCode = response.status;
      return response.json();
    })
    .then((data) => {
      userData = data;
    })
    .catch((error) => console.log("error", error));

  if (statusCode == 404) {
    alert("Este usario no existe");
    return;
  }

  setLoggedUser(userData);

  //Write code before this
  if (userData.email == email) {
    window.location.href = "home.html";
  }
}

function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
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

  window.location.href = "login.html";
}

async function updateCliente(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const myObject = Object.fromEntries(data.entries());

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let postOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(myObject),
  };

  await fetch(URL + "updateCliente", postOptions) //API URL
    .then((response) => response.json())
    .then((data) => {
      userData = data;
    })
    .catch((error) => console.log("error", error));

  setLoggedUser(myObject);
  window.location.href = "profile.html";
}

/*
<-------------------- ALL -------------------->
*/

function setLoggedUser(object) {
  sessionStorage.setItem("loggedUser", JSON.stringify(object));
}

function getLoggedUser() {
  let result = JSON.parse(sessionStorage.getItem("loggedUser"));
  return result;
}

//Gets the name of the loggedUser and sets it on the Nav
function getUserName() {
  let myUser = getLoggedUser();
  document.getElementById("hi-user").innerHTML = "Hola, " + myUser.name;
}

//Gets the loggedUser info and fills the corresponging form on profileCliente or profileRestarurante
function getUserData() {
  getUserName();

  let myUser = getLoggedUser();

  let form = document.getElementById("data-cliente");

  form.name.value = myUser.name;
  form.lname.value = myUser.lname;
  form.email.value = myUser.email;
  form.password.value = myUser.password;
  form.tlf.value = myUser.tlf;
  form.address.value = myUser.address;
  form.city.value = myUser.city;
  form.state.value = myUser.state;
  form.zipcode.value = myUser.zipcode;
  form.creditcard.value = myUser.creditcard;
  form.ccdate.value = myUser.ccdate;
  form.cvv.value = myUser.cvv;
}

async function deleteUser() {
  let myUser = getLoggedUser();
  console.log(myUser);
  await fetch(URL + "delete=" + myUser.email + "&" + myUser.password, {
    method: "DELETE",
  }) //API URL
    .then((response) => response.json())
    .then((data) => {
      userData = data;
    })
    .catch((error) => console.log("error", error));

  logout();
}