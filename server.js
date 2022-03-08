const express = require("express");
const app = express();
const Dialer = require("dialer").Dialer;
const config = {
  url: "https://uni-call.fcc-online.pl",
  login: "<login>",
  password: "<haslo>"
};
Dialer.configure(config);
app.listen(3000, () => {
  console.log("app listening on port 3000");
});
app.get("/call/:number1/:number2", (req, res) => {
  const number1 = req.params.number1;
  const number2 = req.params.number2;
  Dialer.call(number1, number2);
  res.json({ success: true });
});
