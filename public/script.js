//Load tasks from backend
async function loadTasks(){
    const res = await fetch('/tasks')
    const tasks = await res.json();

    const list = document.getElementById('taskList');
    list.innerHTML = '';

    //add tasks from the backend to the front end using a for each loop
    tasks.forEach(task => {
        //creating different front end elements of the tasks
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        const checkbox = document.createElement('input');
        const text = document.createElement('span');

        //make sure each piece of data is aligned with what it is showing
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        text.textContent = task.name;
        deleteButton.textContent = "Delete";

        //event listeners
        deleteButton.addEventListener("click", () => handleDelete(task.id));
        checkbox.addEventListener("change", () => {handleComplete(task.id, target.checked)});

        //adding everything to the list element
        li.appendChild(checkbox);
        li.append(text);
        li.appendChild(deleteButton);
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

async function handleDelete(id){
    await fetch('/tasks/'+id, {method: 'DELETE'});
    loadTasks();
}

async function handleComplete(id, completed){
    await fetch(`/tasks/${id}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    });

    loadTasks();
}

loadTasks();