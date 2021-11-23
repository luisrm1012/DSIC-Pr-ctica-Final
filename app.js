const URL = "http://127.0.0.1:4000";
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const myObject = Object.fromEntries(data.entries());

  var datos;

  await fetch(URL)
    .then((response) => response.json())
    .then((data) => (datos = data));

  console.log(datos);
}
