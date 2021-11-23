var express = require("express");
var fs = require("fs");

const PORT = 4000;

const app = express();
app.listen(PORT);

const dbClientesPath = "clientes.json";
const dbRestaurantesPath = "restaurantes.json";

/*
<-------------------- Middleware -------------------->
*/

//Allow react app use fetch API to consume my Node API
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", false);

  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/*
<-------------------- GET Requests -------------------->
*/

app.get("/", (req, res) => {});

function convertStringToJSON() {
  let read = fs.readFileSync(dbClientesPath, (err) => {});
  let result = JSON.parse(read); //String converted into a JSON Object
  return result;
}

function convertJsonToString(object) {
  let toWrite = JSON.stringify(object, null, "\t");
  fs.writeFileSync(dbClientesPath, toWrite, (err) => {});
}
