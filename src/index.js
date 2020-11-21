var request = require("request");
var url = "https://jsonplaceholder.typicode.com/users/";
var express = require("express");
var app = express();

app.get("/", (req, res) => {
  request(
    {
      url: url,
      json: true
    },
    (error, response, jsonusuarios) => {
      if (!error && response.statusCode === 200) {
        let acumula = "<ul>";
        for (usuario of jsonusuarios) {
          acumula =
            acumula +
            `<li><a href="usuario/${usuario.id}">${usuario.name}</a></li>`;
        }
        res.send(acumula + "</ul>");
      }
    }
  );
});

app.get("/usuario/:id", (req, res) => {
  request(
    {
      url: url + req.params.id,
      json: true
    },
    (error, response, jsonusuario) => {
      if (!error && response.statusCode === 200) {
        res.send(
          `<h1>${jsonusuario.name} (${jsonusuario.username})</h1><h2>${jsonusuario.email}</h2><h3>${jsonusuario.website}</h3><p><a href="/">Regresar a la home</p>`
        );
      }
    }
  );
});

app.listen(8080, function () {
  console.log("Iniciado en puerto 8080");
});
