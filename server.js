const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const server = app.listen(3000, "192.168.0.106", () => {
  console.log(`Server started on http://192.168.0.106:${3000}`);
});

const io = require("socket.io")(server);
io.on("connection", (socket) => {
  socket.on("msg", (data) => {
    socket.broadcast.emit("msg", data);
  });
});
