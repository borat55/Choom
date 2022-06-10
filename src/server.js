import express from "express";


const app = express();
const PORT = 3002;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`✅ Server is listening on localhost:${PORT}`);
app.listen(PORT, handleListen);