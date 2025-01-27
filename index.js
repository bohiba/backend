require('dotenv').config();
const express = require("express");
const app = require("./app");
const http = require("http");

const port = process.env.PORT || 8000;
app.use(express.json());
const server = http.createServer(app);

server.listen(port, () => {
    var options = {
        port: port,
        host: "localhost",
    };

    console.log(`\n==========\n| Server is running at ${options.port}. |\n==========\n`);
    
    var request = http.request(options);
    request.setHeader('Content-Type', 'application/json');
    request.end();
});