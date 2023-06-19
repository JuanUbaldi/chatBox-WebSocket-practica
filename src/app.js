import express from "express";
import { Server } from "socket.io";
import { testSocketRouter } from "./routes/test.socket.router.js";
import { __dirname } from "./utils.js";
import path from "path";
import handlebars from "express-handlebars";
const app = express();
const port = 8000;

//SOCKET
//socket: guardo el servidor comun en una variable
const httpServer = app.listen(port, () => {
  console.log(`escuchando en http://localhost:${port}`);
});

//le aviso a socket cual era el antiguo servidor y tambien se lo paso
const socketServer = new Server(httpServer);

//comienzo con el servidor socket, hago un clg cuando me conecto a un front
let msgs = [];

socketServer.on("connection", (socket) => {
  socket.on("FrontToBack", (msg) => {
    msgs.unshift(msg);
    console.log(msg);
    socketServer.emit("BackToFront", msgs);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*para archivos estaticos*/ app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

//configuramos el motor de handlebars en la app
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "handlebars");

//rutas socket
app.use("/test-socket", testSocketRouter);

//DEPLOY EN GLITCH: LA PAGINA ESTA EN ESTA URL : https://quark-maroon-wisteria.glitch.me/test-socket
