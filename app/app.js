const http = require("http");
const client = require("prom-client");

const PORT = 3001;

// Collect default metrics
client.collectDefaultMetrics();

const server = http.createServer(async (req, res) => {
  if (req.url === "/metrics") {
    res.writeHead(200, { "Content-Type": client.register.contentType });
    res.end(await client.register.metrics());
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("CI/CD Pipeline Working 🚀");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});