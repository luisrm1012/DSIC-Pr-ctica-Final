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
    let type = myObject.tipo;
    let userData = null;

    await fetch(URL + email + "&" + password + "&" + type) //API URL
        .then((response) => response.json())
        .then((data) => {
            userData = data;
        })
        .catch((error) => console.log("error", error));

    setLoggedUser(userData)

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
    window.location.href = "profileCliente.html";
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

async function updateRestaurante(event) {
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

    await fetch(URL + "updateRestaurante", postOptions) //API URL
        .then((response) => response.json())
        .then((data) => {
            userData = data;
        })
        .catch((error) => console.log("error", error));
    
    setLoggedUser(myObject);
    window.location.href = "profileRestaurante.html";
}

/*
<-------------------- ALL -------------------->
*/

function setLoggedUser(object) {
    sessionStorage.setItem("loggedUser",JSON.stringify(object))
}

function getLoggedUser() {
    let result = JSON.parse(sessionStorage.getItem("loggedUser"))
    return result;
}

//Gets the name of the loggedUser and sets it on the Nav
function getUserName() {
    let myUser = getLoggedUser();
    document.getElementById("hi-user").innerHTML = "Hola, " + myUser.name;
}

//Redirects to the corresponding page, depending on the user's type (cliente/restaurante)
function getProfileOnType() {
    
    let myUser = getLoggedUser();

    if (myUser.tipo == "Restaurante") {
        window.location.href = "profileRestaurante.html";
    } else if (myUser.tipo == "Cliente") {
        window.location.href = "profileCliente.html";
    }
}

//Gets the loggedUser info and fills the corresponging form on profileCliente or profileRestarurante
function getUserData() {
    
    getUserName();

    let myUser = getLoggedUser();

    let form;

    if (myUser.tipo == "Cliente") {
      form = document.getElementById("data-cliente");
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
    } else if (myUser.tipo == "Restaurante") {
      form = document.getElementById("data-restaurante");
      form.name.value = myUser.name;
      form.email.value = myUser.email;
      form.password.value = myUser.password;
      form.address.value = myUser.address;
      form.city.value = myUser.city;
      form.state.value = myUser.state;
      form.zipcode.value = myUser.zipcode;
      form.cif.value = myUser.cif;
    }
    
}

async function deleteUser() {
    
    let myUser = getLoggedUser();
    console.log(myUser)
    await fetch(URL + "delete=" + myUser.email + "&" + myUser.password + "&" + myUser.tipo, {method: "DELETE"}) //API URL
        .then((response) => response.json())
        .then((data) => {
            userData = data;
        })
        .catch((error) => console.log("error", error));

    logout();
}