const URL = "http://127.0.0.1:4000";
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const myObject = Object.fromEntries(data.entries());

  var datos;
  /*
  serverResponse = await fetch(URL);
  datos = await serverResponse.json();*/

  await fetch(URL) //API URL
    .then((response) => response.json())
    .then((data) => {
      datos = data;
    })
    .catch((error) => console.log("error", error));

  console.log(datos);
}
