const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const myObject = Object.fromEntries(data.entries());

  console.log(JSON.stringify(myObject));
}
