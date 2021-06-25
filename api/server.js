const express = require("express");
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Welcome to Accounts API');
})

server.use(function(err, req, res, next) {
    console.error(err.stack);
    res.json({status: 500, message: 'Something happened, try again'})
})

module.exports = server;
