// Variables
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Agregar tarea
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Por favor, ingresa una tarea válida.");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        ${taskText}
        <button onclick="completeTask(this)">Completar</button>
        <button onclick="deleteTask(this)">Eliminar</button>
    `;

    taskList.appendChild(li);
    taskInput.value = "";
}

// Completar tarea
function completeTask(button) {
    const li = button.parentElement;
    li.classList.toggle("completed");
}

// Eliminar tarea
function deleteTask(button) {
    const li = button.parentElement;
    taskList.removeChild(li);
}

// Borrar tareas completadas
function clearCompletedTasks() {
    const completedTasks = document.querySelectorAll(".completed");
    completedTasks.forEach((task) => {
        taskList.removeChild(task);
    });
}