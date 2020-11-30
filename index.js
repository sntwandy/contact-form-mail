const path = require("path");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require("./src/routes/index"));

app.use(express.static(path.join(__dirname, "src/public")));

app.listen(3000, () => {
  console.log("Server is running on port: 3000");
});
