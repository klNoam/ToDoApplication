//Load tasks from backend
async function loadTasks(){
    const res = await fetch('/tasks')
    const tasks = await res.json();

    const list = document.getElementById('taskList');
    list.innerHTML = '';

    //add tasks front the backend to the front end using a for each loop
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name + (task.completed ? "Completed": "");
        list.appendChild(li);
    });
}

async function addTask(){
    const input = document.getElementById('taskInput');
    
    await fetch('/tasks',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: input.value})
    });

    input.value = '';
    loadTasks();
}

loadTasks();