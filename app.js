/* packages */
const express = require("express");
const config = require("config");
const bodyParser = require("body-parser");


/* app config */
const app = express();
const port = config.get("server-port");
const jsonParser = bodyParser.json();
const urlEncodeParser = bodyParser.urlencoded({
    extended:true
});

app.use(jsonParser);
app.use(urlEncodeParser);

const ipnFn = require("./middleware/getIpAddress");
app.use("*",ipnFn);
/* metodos */
app.get("/", (req,res,next) => {
    res.send("Bienvenido a la api");
}); //saludo de la api

const rutas = require("./routes/vehiculo.routes");/* propiedad? */
rutas.vehiculoRoutes(app);

app.listen(port,() => {
    console.log("server corriendo...");
});