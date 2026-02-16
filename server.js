//load in express library
const express = require('express');
const app = express();

//port for localhost
const PORT = 3000;

//static serving to connect to frontend
app.use(express.static('public'));

function startServer(){
    console.log("Server running on http://localhost:" + PORT);
}

//use the requested PORT, logs that the server is up and running
app.listen(PORT, startServer);

app.use(express.json());

//ACTUAL TO-DO LIST IMPLEMENTATION:

let tasks = [];
let idSys = 1;

//get /tasks implementation
function getTasks(req, res){
    res.json(tasks);
}
app.get('/tasks', getTasks);

//post /tasks implementation
function postTasks(req, res){
    //creates new task
    newTask = {"id": idSys++, "name": req.body.name, "completed": false};
    //adds to tasks
    tasks.push(newTask);
    res.json(newTask);
}
app.post('/tasks', postTasks);


//put /tasks:id implementation
function putTasks(req, res){
    let currId = Number(req.params.id);
    //finds task
    let task = tasks.find(function(t){
        return t.id === currId;
    });

    //throws error if it could not find a task
    if(!task){
        return res.status(404).json({ message: "Task not found" });
    }
    task.completed = !task.completed;
    res.json(task);
}
app.put('/tasks/:id', putTasks);

//delete /tasks:id implementation
function deleteTask(req, res){
    let currId = Number(req.params.id);

    //check if task exists
    let taskExists = tasks.find(t => t.id === currId);
    if(!taskExists){
        return res.status(404).json({message: "Task not found"});
    }
    //Remove the task (copying the array for all elements except that id)
    tasks = tasks.filter(t => t.id !== currId);

    res.json({message: "Task deleted successfullyt"});
}

app.delete('/tasks/:id', deleteTask);
