var express = require("express");
var fs = require("fs");

const PORT = process.env.PORT || 4000;

const app = express();
app.listen(PORT);

const URL = "http://127.0.0.1:5500/";
const dbClientesPath = "clientes.json";

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

app.get("/", (req, res) => {
  res.send("DSIC Práctica Final Server");
});

app.get("/:email&:password", (req, res) => {
  let email = req.params.email;
  let password = req.params.password;
  let statusCode = 404;
  let data = convertStringToJSON(dbClientesPath);

  let result;

  for (let i = 0; i < data.length; i++) {
    if (data[i].email == email && data[i].password == password) {
      result = data[i];
      statusCode = 200;
      break;
    }
  }
  if (statusCode == 404) {
    res.sendStatus(statusCode);
  } else if (statusCode == 200) {
    res.send(result);
  }
});

app.get("/exists=:email", (req, res) => {
  let email = req.params.email;
  let statusCode = 404;
  let data = convertStringToJSON(dbClientesPath);

  for (let i = 0; i < data.length; i++) {
    if (data[i].email == email) {
      statusCode = 200;
      break;
    }
  }
  if (statusCode == 404) {
    res.sendStatus(statusCode);
  } else if (statusCode == 200) {
    res.sendStatus(statusCode);
  }
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

/*
<-------------------- PUT Requests -------------------->
*/

app.put("/updateCliente", (req, res) => {
  let data = convertStringToJSON(dbClientesPath);

  for (let i = 0; i < data.length; i++) {
    if (data[i].email == req.body.email) {
      data[i] = req.body;
      break;
    }
  }

  convertJsonToString(dbClientesPath, data);

  res.send(req.body);
});

/*
<-------------------- DELETE Requests --------------------> "/:email&:password&:type"
*/

app.delete("/delete=:email&:password", (req, res) => {
  let email = req.params.email;
  let password = req.params.password;
  let data = convertStringToJSON(dbClientesPath);
  let db = dbClientesPath;

  let result = JSON.parse("{}");

  for (let i = 0; i < data.length; i++) {
    if (data[i].email == email && data[i].password == password) {
      data.splice(i, 1);
      break;
    }
  }
  convertJsonToString(db, data);
  res.sendStatus(result);
});

/*
<-------------------- Extra Functions -------------------->
*/

function convertStringToJSON(db) {
  //This function reads the db, and turns it into a JSON
  let read = fs.readFileSync(db, (err) => {});
  let result = JSON.parse(read); //String converted into a JSON Object
  return result;
}

function convertJsonToString(db, object) {
  //This fucntion gets as parameter an object (JSON db), turns it into a string and overwrites the db.
  let toWrite = JSON.stringify(object, null, "\t");
  fs.writeFileSync(db, toWrite, (err) => {});
}
