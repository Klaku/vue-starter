const express = require("express");
const res = require("express/lib/response");
const app = express();
const Dialer = require("dialer").Dialer;
const bodyParser = require('body-parser')

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
require("dotenv").config();
let bridge;
//console.log(process.env.NODE_SERVER_LOGIN, process.env.NODE_SERVER_PASSWORD);
const config = {
  url: "https://uni-call.fcc-online.pl",
  login: process.env.NODE_SERVER_LOGIN,
  password: process.env.NODE_SERVER_PASSWORD,
};
Dialer.configure(config);

app.get("/call/:number1/:number2", async (req, res) => {
  const number1 = req.params.number1;
  const number2 = req.params.number2;
  bridge = await Dialer.call(number1, number2);
  res.json({ success: true });
});

app.post("/call", async (req, rep) => {
  let body = req.body;
  console.log(body);
  rep.send(200);
});

app.get("/status", async (req, rep) => {
  let status = "NONE";
  if (bridge !== null) {
    try{
      status = await bridge.getStatus();
    }catch(exception){

    }
    
  }
  res.json({ success: true, status: status });
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
