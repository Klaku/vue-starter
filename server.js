const express = require("express");
const res = require("express/lib/response");
const app = express();
const Dialer = require("dialer").Dialer;
let bridge;
const config = {
  url: "https://uni-call.fcc-online.pl",
  login: "focus01",
  password: "234rwefgdfb",
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
