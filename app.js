const http = require('http');
const express = require('express');
const debug = require('debug')('nodestr:server');

const app = express();
const port = 3000;
app.set('port', port);


const hostname = '127.0.0.1';
const server = http.createServer(app);
const router = express.Router();

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        status: "OK"
    });
});

app.use('/', route);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});