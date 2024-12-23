const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(path.join(__dirname, "public")));


io.on("connection", (socket) => {
  console.log("یک کلاینت متصل شد");

  
  socket.on("message", (msg) => {
    console.log("پیام دریافت شد:", msg);
    io.emit("message", msg);
  });

  
  socket.on("disconnect", () => {
    console.log("یک کلاینت قطع شد");
  });
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`سرور در حال اجرا روی پورت ${PORT}`);
});
