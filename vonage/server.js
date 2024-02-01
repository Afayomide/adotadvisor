const express = require("express");

const { json, urlencoded } = express;

const app = express();

app.use(json());

app.use(
  urlencoded({
    extended: true,
  })
);

app.post("/inbound", (req, res) => {
    console.log(req.body);
  
    res.status(200).end();
  });

app.listen(3000, () => {
  console.log("Server listening at http://localhost:3000");
});