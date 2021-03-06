import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();
const PORT = 3002;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`✅ Server is listening on localhost:${PORT}`);

const httpServer = http.createServer(app);
const io = SocketIO(httpServer);

io.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Soekt Event : ${event}`)
    })
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome")
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach((room)=> socket.to(room).emit("bye"));
    });
    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", msg);
        done();
    });
});




httpServer.listen(PORT, handleListen);

