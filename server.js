const express = require("express");
const res = require("express/lib/response");
const app = express();
const Dialer = require("dialer").Dialer;
require('dotenv').config();
let bridge;
console.log(process.env.NODE_SERVER_LOGIN, process.env.NODE_SERVER_PASSWORD)
const config = {
  url: "https://uni-call.fcc-online.pl",
  login: process.env.NODE_SERVER_LOGIN,
  password: process.env.NODE_SERVER_PASSWORD,
};
Dialer.configure(config);
app.listen(3000, () => {
  console.log("app listening on port 3000");
});

app.get("/call/:number1/:number2", async (req, res) => {
  const number1 = req.params.number1;
  const number2 = req.params.number2;
  bridge = await Dialer.call(number1, number2);
  res.json({ success: true });
});

app.get("/status", async (req, rep) => {
  let status = "NONE";
  if (bridge !== null) {
    status = await bridge.getStatus();
  }
  res.json({ success: true, status: status });
});
