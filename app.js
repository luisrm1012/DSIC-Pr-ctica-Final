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

    window.location.href = "login.html";
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

    window.location.href = "login.html";
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

    document.getElementById("hi-user").innerHTML = "Hola, " + myData.email;
}

async function getProfileOnType() {
    var myData;
    await fetch(URL + "loggedUser") //API URL
        .then((response) => response.json())
        .then((data) => {
            myData = data;
        })
        .catch((error) => console.log("error", error));

    if (myData.tipo == "Restaurante") {
        window.location.href = "profileRestaurante.html";
    } else if (myData.tipo == "Cliente") {
        window.location.href = "profileCliente.html";
    }
}

async function getUserData() {
    var myData;
    await fetch(URL + "loggedUser") //API URL
        .then((response) => response.json())
        .then((data) => {
            myData = data;
        })
        .catch((error) => console.log("error", error));

    let form = document.getElementsByClassName("user-Profile");

    if (myData.tipo == "Cliente") {
      form.name.value = myData.name;
      form.lname.value = myData.lname;
      form.email.value = myData.email;
      form.password.value = myData.password;
      form.tlf.value = myData.tlf;
      form.address.value = myData.address;
      form.city.value = myData.city;
      form.state.value = myData.state;
      form.zipcode.value = myData.zipcode;
      form.creditcard.value = myData.creditcard;
      form.ccdate.value = myData.ccdate;
      form.cvv.value = myData.cvv;
    } else if (myData.tipo == "Restaurante") {
      form.name.value = myData.name;
      form.email.value = myData.email;
      form.password.value = myData.password;
      form.address.value = myData.address;
      form.city.value = myData.city;
      form.state.value = myData.state;
      form.zipcode.value = myData.zipcode;
      form.cif.value = myData.cif;
    }
    
}