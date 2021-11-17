const http = require("http");
const url = require("url");

function getTime(timeZone) {
  return new Date().toLocaleString("en-US", { timeZone });
}

// Create a server object
const server = http.createServer((req, res) => {
  const parts = url.parse(req.url, true);
  const query = parts.query;
  res.write(`Current date is "${getTime(query.timezone)}"`); // Write a response to the client
  res.end(); // End the response
});

server.listen(8080);

/**
 * Example: http://localhost:8080
 * Example: http://localhost:8080?timezone=Asia/Jakarta
 * Example: http://localhost:8080?timezone=America/New_York
 */
