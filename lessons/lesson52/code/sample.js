const { createServer } = require("http");
const fs = require("fs");

// Create a server object
const server = createServer((req, res) => {
  res.write("Hello World ??"); // Write a response to the client
  res.end(); // End the response
});

server.listen(8080);
