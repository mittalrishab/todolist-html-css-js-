let submit = document.getElementById('submit');
let form = document.querySelector('.container');
let task = document.getElementById('task');
let taskContainer = document.querySelector('.tasks-container');
let message = document.querySelector(".message");

// Load tasks from localStorage or initialize an empty array
let taskarray = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to update the visibility of the message
function updateMessageVisibility() {
    message.style.display = taskContainer.children.length === 0 ? "block" : "none";
}

// Function to create a task element
function createTaskElement(text, id) {
    let createdTask = document.createElement('div');
    createdTask.classList.add('todo');
    createdTask.dataset.id = id;

    let taskContent = document.createElement('div');
    taskContent.classList.add('content');
    taskContent.textContent = text;

    let operations = document.createElement('div');
    operations.classList.add('operations');

    // Delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = `<img src="svgs/delete.svg" alt="delete">`;
    deleteBtn.addEventListener("click", () => {
        // Remove task from array and localStorage
        taskarray = taskarray.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(taskarray));
        createdTask.remove();
        updateMessageVisibility();
    });

    // Complete button
    let completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = `<img src="svgs/complete.svg" alt="complete">`;
    completeBtn.addEventListener("click", () => {
        taskContent.style.textDecoration = taskContent.style.textDecoration === 'line-through' ? 'none' : 'line-through';
    });

    operations.append(deleteBtn, completeBtn);
    createdTask.append(taskContent, operations);
    taskContainer.appendChild(createdTask);
}

// Load existing tasks on page load
document.addEventListener('DOMContentLoaded', () => {
    taskarray.forEach(task => {
        createTaskElement(task.text, task.id);
    });
    updateMessageVisibility();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let taskText = task.value.trim();

    if (!taskText) {
        alert("Task cannot be empty!");
        return;
    }

    // Create a unique ID for the task
    const taskId = Date.now().toString();
    taskarray.push({ id: taskId, text: taskText });
    localStorage.setItem('tasks', JSON.stringify(taskarray));

    createTaskElement(taskText, taskId);
    task.value = "";
    updateMessageVisibility();
});