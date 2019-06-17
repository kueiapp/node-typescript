/**
* by kueiapp.com
*/

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var fs = require("fs");
var server = http.createServer(function (req, res) {
    res.end('Hello Node!');
});
// default framework without Express
http.createServer(function (request, response) {
    fs.readFile(__dirname + '/public/manifest.json', function (err, file) {
        if (err) {
            response.writeHead(500);
            response.end("Error");
            return;
        }
        else {
            response.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8"
            });
            response.end(file, 'utf8');
        }
    });
});
// .listen(8000,function(){
//   console.log("listening to port 8000")
// });
// ES5 require is workable in non-strict mode
var express = require('express');
var bodyParser = require('body-parser');
// import * as express from 'express';
// import * as bodyParser from 'body-parser';
// Express
var app = express();
app.use(express.static(__dirname + '/public'));
// create application/json parser to support json encoded bodies
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false })); // false:string, true:all types
// CROS:cross-rigein
// all requests are allowed with CORS
// app.use(function(req,res,next){
//   res.setHeader("Access-Control-Allow-Origin","*")
//   next()
// })
var port = process.env.PORT || 3000;
/** node.js main **/
app.listen(port, function () {
    console.log("Listening on ", port);
});
/** URI */
app.get('/', function (request, response) {
    response.header("Content-Type", "text/html; charset=utf-8");
    response.sendFile('/public/index.html');
});
// GET method
// http://localhost:3000/devices?id=2&name=Arduino
app.get('/devices', function (request, response) {
    // cross domain access
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Content-Type", "application/json; charset=utf-8");
    response.send({
        "status": "OK", "data": { "id": "\u88DD\u7F6E" + request.query.id + "\u865F", "name": request.query.name }
    });
});
// Restfull
app.get('/user/:uid', function (request, response) {
    response.header("Content-Type", "text/html; charset=utf-8");
    var udata;
    switch (request.params.uid) {
        case '1':
            udata = { "fname": "Kiro", "lname": "Tsubasa" };
            break;
        case '2':
            udata = { "fname": "Mao", "lname": "Alan" };
            break;
        default:
            udata = { "fname": "nodata" };
            break;
    }
    response.send({
        "status": "OKKKKKK", "data": udata
    });
});
//** doPost with application/x-www-form-urlencoded
app.post("/name", function (request, response) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Content-Type", "application/json; charset=utf-8");
    var signal = request.body.signal;
    var name = request.body.name;
    response.send({
        "signal": signal,
        "name": name
    });
});
app.post("/device", function (request, response) {
    response.header("Content-Type", "application/json; charset=utf-8");
    var signal = request.body.signal;
    var name = request.body.name;
    response.send({
        "signal": signal,
        "name": name
    });
});
