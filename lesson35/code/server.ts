/// <reference path="types.d.ts"/>
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function connection(ws, req) {
  console.log(req.headers["sec-websocket-key"]);
  ws.id = req.headers["sec-websocket-key"];
  console.log(wss.clients.size);
  ws.on("message", function message(data) {
    for (const socket of wss.clients) {
      if (socket.readyState === socket.OPEN && socket.id !== ws.id) {
        socket.send(data);
      }
    }

    console.log("received: %s", data);
  });
});
