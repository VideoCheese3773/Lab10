//Seccion para unir HTML y JS
const toDoContainer = document.getElementById("toDoContainer");
const doingContainer = document.getElementById("doingContainer");
const doneContainer = document.getElementById("doneContainer");

const textInput = document.getElementById("textInput");
const addButton = document.getElementById("addButton");

//Logica del LocalStorage
let tasks = [];

//Funciones
function loadTasks(){
    let loadedTasks = localStorage.getItem("tasks");
    if(loadedTasks !== null){
        tasks = JSON.parse(loadedTasks);
    };
    console.log(tasks);
}

function saveTasks(){
    let json = JSON.stringify(tasks);
    localStorage.setItem("tasks", json);
}

function showTasks(){
    toDoContainer.innerHTML = "<h3>To Do</h3>";
    doingContainer.innerHTML = "<h3>Doing</h3>";
    doneContainer.innerHTML = "<h3>Done</h3>";
    for(let i = 0; i<tasks.length; i++){
        let task = new Task(
            tasks[i].task, tasks[i].state, tasks[i].id = i
        )
        if (task.state == 0){
            task.render(toDoContainer);
        }
        else if (task.state == 1){
            task.render(doingContainer);
        }
        else if (task.state == 2){
            task.render(doneContainer);
        }
        else{
            console.log("ERROR: carga de archivos por estado")
        }
    }
};

function post(){
    if(textInput.value !== ""){
        let text = textInput.value;
        let state = 0;
        let id = "post error";
        let task = new Task(text, state, id);
        tasks.push(task);
        console.log(tasks);
        saveTasks();
    }
    showTasks()
}

function upgradeState(index){
    console.log(tasks);
    let task = tasks[index].task;
    let state = tasks[index].state;
    if (tasks[index].state < 2) {
        state = tasks[index].state + 1;
    }
    let id = "ID FAILURE IN UPGRADE";
    let newTask = new Task(task, state, id);
    tasks.push(newTask);
    tasks.splice(index,1);

    showTasks();
    saveTasks();
}

function downgradeState(index){
    console.log(tasks);
    let task = tasks[index].task;
    let state = tasks[index].state;
    if (tasks[index].state > 0) {
        state = tasks[index].state - 1;
    }
    let id = "ID FAILURE IN DOWNGRADE";
    let newTask = new Task(task, state, id);
    tasks.push(newTask);
    tasks.splice(index,1);

    showTasks();
    saveTasks();
}

function erase(id){
    tasks.splice(id,1);
    showTasks();
    saveTasks();
}

//starters
loadTasks();

addButton.addEventListener('click', post);

showTasks();