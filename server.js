var express = require("express");
var fs = require("fs");

const PORT = 4000;

const app = express();
app.listen(PORT);

const URL = "http://127.0.0.1:5500/";
const dbClientesPath = "clientes.json";
const dbRestaurantesPath = "restaurantes.json";

var loggedUser;

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

app.get("/:email&:password&:type", (req, res) => {
  let data;
  let email = req.params.email;
  let password = req.params.password;
  let type = req.params.type;

  if (type == "cliente") {
    data = convertStringToJSON(dbClientesPath);
  } else if (type == "restaurante") {
    data = convertStringToJSON(dbRestaurantesPath);
  }

  let result = JSON.parse("{}");

  for (let i = 0; i < data.length; i++) {
    if (data[i].email == email && data[i].password == password) {
      result = data[i];
      loggedUser = data[i];
      break;
    }
  }

  res.send(result);
});

app.get("/loggedUser", (req, res) => {
  res.send(loggedUser);
});

/*
<-------------------- POST Requests -------------------->
*/

app.post("/newCliente", (req, res) => {
  console.log(req.body);
  let data = convertStringToJSON(dbClientesPath);
  data.push(req.body);
  convertJsonToString(dbClientesPath, data);

  res.send(req.body);
});

app.post("/newRestaurante", (req, res) => {
  console.log(req.body);
  let data = convertStringToJSON(dbRestaurantesPath);
  data.push(req.body);
  convertJsonToString(dbRestaurantesPath, data);

  res.send(req.body);
});

/*
<-------------------- Extra Functions -------------------->
*/

function convertStringToJSON(db) {
  let read = fs.readFileSync(db, (err) => {});
  let result = JSON.parse(read); //String converted into a JSON Object
  return result;
}

function convertJsonToString(db, object) {
  let toWrite = JSON.stringify(object, null, "\t");
  fs.writeFileSync(db, toWrite, (err) => {});
}