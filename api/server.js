const express = require("express");
const accountsRouter = require('./accounts/accounts-router');
const server = express();
server.use(express.json());

server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
    res.send('Welcome to Accounts API');
})

server.use(function(err, req, res, next) {
    console.error(err.stack);
    res.json({status: 500, message: 'Something happened, try again'})
})

module.exports = server;
