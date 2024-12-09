const express = require("express");
const PublicRoutes = require("./routes/PublicRoutes.js");
const PrivateRoutes = require("./routes/PrivateRoutes.js");

const host = "localhost";
const port = 3000;

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  return response.send("Oi, eu sou um Backend com NodeJS + Express");
});

app.use(PublicRoutes);
app.use(PrivateRoutes);

app.listen(port, host, () => {
  console.log(`Servidor executado em http://${host}:${port}`);
});