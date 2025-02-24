let submit = document.getElementById('submit');
let form = document.querySelector('.container');
let task = document.getElementById('task');
let taskContainer = document.querySelector('.tasks-container');
let message = document.querySelector(".message");
let todo = document.getElementsByClassName('todo');
//check what is the difference between this and simple todo.getElemets
if (taskContainer.children.length === 0) {
    message.style.display = "block";
}  else {
    message.style.display = "none";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (task.value.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    let createdTask = document.createElement('div');
    createdTask.classList.add('todo');

    let taskContent = document.createElement('div');
    taskContent.classList.add('content');
    taskContent.innerText = task.value;

    let operations = document.createElement('div');
    operations.classList.add('operations');

    // Add delete button

    //what happens if deletebutton is added outside
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML =`<img src=svgs/delete.svg alt="delete">`;
    deleteBtn.addEventListener("click", () => {
        createdTask.remove();
        if (taskContainer.children.length === 0) {
            message.style.display = "block";
        }        
    });

    let completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML=`<img src="svgs/complete.svg" alt="complete">`
    completeBtn.addEventListener("click",()=>{
        taskContent.style.textDecoration = 'line-through';
    });

    operations.appendChild(deleteBtn);
    operations.appendChild(completeBtn);
    createdTask.appendChild(taskContent);
    createdTask.appendChild(operations);

    taskContainer.appendChild(createdTask);
    
    // Hide message
    message.style.display = "none";

    // Clear input
    task.value = "";
});
