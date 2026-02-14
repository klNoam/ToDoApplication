//load in express library
const express = require('express');
const app = express();

//port for localhost
const PORT = 3000;

function handleRoot(req, res){
    res.send("Hello World");
}

//define GET route
app.get('/', handleRoot);

function startServer(){
    console.log("Server running on http://localhost:" + PORT);
}

//use the requested PORT, logs that the server is up and running
app.listen(PORT, startServer);



