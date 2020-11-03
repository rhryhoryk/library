const http = require('http');
const app = require('./app');
const configVariables = require('./config/variables');

const PORT = configVariables.port;

const server = http.createServer(app);

server.listen(PORT, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`server is working. port: ${PORT}`);
  }
});
