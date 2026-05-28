const http = require("http");
const client = require("prom-client");

const PORT = 3001;

// Collect default metrics
client.collectDefaultMetrics();

const server = http.createServer(async (req, res) => {

  // Metrics endpoint
  if (req.url === "/metrics") {
    res.writeHead(200, {
      "Content-Type": client.register.contentType
    });

    res.end(await client.register.metrics());

  } else {

    // Homepage
    res.writeHead(200, {
      "Content-Type": "text/html"
    });

    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>DevOps Monitoring Dashboard</title>

        <style>
          body {
            font-family: Arial;
            background-color: #0f172a;
            color: white;
            text-align: center;
            padding-top: 100px;
          }

          .box {
            background: #1e293b;
            width: 60%;
            margin: auto;
            padding: 40px;
            border-radius: 15px;
          }

          h1 {
            color: #38bdf8;
          }
        </style>
      </head>

      <body>

        <div class="box">
          <h1>🚀 DevOps Monitoring Dashboard</h1>

          <h3>Application Status: Running ✅</h3>

          <p>Dockerized Node.js Application</p>
          <p>Monitoring using Prometheus</p>
          <p>Visualization using Grafana</p>

        </div>

      </body>
      </html>
    `);
  }
});

server.listen(PORT, () => {
  console.log("Server running on port 3001");
});