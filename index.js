require('dotenv').config();
const express = require("express");
const app = require("./app");
const http = require("http");

const app = require('./app');
const port = process.env.PORT || 8000;
app.use(express.json());
const server = http.createServer(app);

server.listen(port, ()=> {
    console.log(`Server is running at ${port}.`);
    
    var options = {
        port: port,
        host: "localhost",
    };
    
    var request = http.request(options);
    
    request.setHeader('Content-Type', 'application/json');

    request.end();
});










// app.listen(port, ()=> {
//     console.log(`Server working ${port}`);
// });