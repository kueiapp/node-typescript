/**
* by kueiapp.com
*/

import * as http from 'http';
import * as fs from 'fs';

const server = http.createServer((req, res)=>{
    res.end('Hello Node!');
});

// default framework without Express
http.createServer(function(request, response) {
  
  fs.readFile(__dirname + '/public/manifest.json', (err,file) => {
    if(err){
      response.writeHead(500)
      response.end("Error")
      return
    }
    else{
      response.writeHead(200,{
        "Content-Type": "application/json; charset=utf-8"
      })
      response.end(file, 'utf8')
    }
  })

})
// .listen(8000,function(){
//   console.log("listening to port 8000")
// });

// ES5 requires are workable
const express = require('express');
const bodyParser = require('body-parser');
// import * as express from 'express';
// import * as bodyParser from 'body-parser';

// Express
const app = express();
app.use(express.static(__dirname + '/public'));

// create application/json parser to support json encoded bodies
const jsonParser = bodyParser.json() 
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }) )// false:string, true:all types

// CROS:cross-rigein
// all requests are allowed with CORS
// app.use(function(req,res,next){
//   res.setHeader("Access-Control-Allow-Origin","*")
//   next()
// })

const port = process.env.PORT || 3000;

/** node.js main **/
app.listen(port, function() {
  console.log("Listening on ",port);
});

/** URI */
app.get('/', function(request:any, response:any) {
  response.header("Content-Type", "text/html; charset=utf-8");
  response.sendFile('/public/index.html');
});

// GET method
// http://localhost:3000/devices?id=2&name=Arduino
app.get('/devices', function(request:any, response:any) {

	// cross domain access
	response.header("Access-Control-Allow-Origin","*")
  response.header("Content-Type", "application/json; charset=utf-8");
  response.send( {
   "status": "OK", "data": {"id":`裝置${request.query.id}號`, "name":request.query.name }
  })
 
});

// Restfull
app.get('/user/:uid', function(request:any, response:any) {

  response.header("Content-Type", "text/html; charset=utf-8");
  var udata;
  switch(request.params.uid){
    case '1':
      udata = {"fname":"Kiro","lname":"Tsubasa"}
      break;
    case '2':
      udata = {"fname":"Mao","lname":"Alan"}
      break;
    default: 
      udata = {"fname":"nodata"}
      break;
  }
  response.send({
    "status": "OKKKKKK", "data": udata
  })

});

//** doPost with application/x-www-form-urlencoded
app.post("/name", function(request:any, response:any){

	response.header("Access-Control-Allow-Origin","*")
  response.header("Content-Type", "application/json; charset=utf-8");
  var signal:string = request.body.signal;
  var name:string = request.body.name;
  response.send( {
   "signal": signal,
   "name": name
  })

})

app.post("/device", function(request:any, response:any){
  response.header("Content-Type", "application/json; charset=utf-8");
  var signal:string = request.body.signal;
  var name:string = request.body.name;
  response.send( {
   "signal": signal,
   "name": name
  })

})