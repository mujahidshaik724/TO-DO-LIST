import UIHelper from "./UiHandler.js";
import StorageHelper from "./StorageHandler.js";

const TodoManager = (mainContainer, projects) => {
    const ui = UIHelper();
    const storage = StorageHelper();

    const showMainContent = (projectName) => {
        mainContainer.innerHTML = `
           <div class="main-head"> <h2>${projectName}</h2>
            <button class="add-todo-btn">Add To-Do</button></div>
            <div class="todo-form-container"></div> <!-- Container for the form -->
            <ul class="todo-list"></ul>
        `;

        projects[projectName].forEach(todo => addTodoCard(todo, projectName));
        document.querySelector(".add-todo-btn").addEventListener("click", () => showTodoForm(projectName));
    };

    const showTodoForm = (projectName, existingTodo = null, index = null) => {
        if (document.querySelector(".todo-form")) return; // Prevent multiple forms
    
        const form = document.createElement("form");
        form.classList.add("todo-form", "visible"); // Add 'visible' class here
    
        form.innerHTML = `
           <div class="form-container"> <div> <label for="todo-name">To-Do Name:</label>
            <input type="text" id="todo-name" class="todo-name-input" placeholder="To-Do Name" value="${existingTodo ? existingTodo.name : ""}">
            </div>
            <div class="date">
            <label for="todo-start">Start Date:</label>
            <input type="date" id="todo-start" class="todo-start-input" value="${existingTodo ? existingTodo.startDate : ""}">
            <label for="todo-end">End Date:</label>
            <input type="date" id="todo-end" class="todo-end-input" value="${existingTodo ? existingTodo.endDate : ""}">
            </div>
            <div>
            <label for="todo-status">Status:</label>
            <input type="checkbox" id="todo-status" class="todo-completed-input" ${existingTodo && existingTodo.completed ? "checked" : ""}>
            </div>
            <div class="form-buttons">
                <button type="button" class="confirm-btn">${existingTodo ? "Update" : "Confirm"}</button>
                <button type="button" class="cancel-btn">Cancel</button>
            </div>
            </div>
        `;
    
        // Add event listeners for buttons
        form.querySelector(".confirm-btn").addEventListener("click", () => saveTodo(projectName, form, existingTodo, index));
        form.querySelector(".cancel-btn").addEventListener("click", () => form.remove());
    
        // Append the form to the dedicated container
        document.querySelector(".todo-form-container").appendChild(form);
    };
    

    const saveTodo = (projectName, form, existingTodo = null, index = null) => {
        const todo = {
            name: form.querySelector(".todo-name-input").value.trim(),
            startDate: form.querySelector(".todo-start-input").value,
            endDate: form.querySelector(".todo-end-input").value,
            completed: form.querySelector(".todo-completed-input").checked
        };

        if (!todo.name) return; // Prevent adding empty to-do

        if (existingTodo !== null && index !== null) {
            projects[projectName][index] = todo; // Update existing to-do
        } else {
            projects[projectName].push(todo); // Add new to-do
        }

        storage.saveData("projects", projects);
        form.remove();
        showMainContent(projectName);
    };

    const addTodoCard = (todo, projectName) => {
        const index = projects[projectName].indexOf(todo);

        const todoCard = document.createElement("li");
        todoCard.classList.add("todo-card");
        todoCard.innerHTML = `
           <div class="card-content"> <span><strong>${todo.name}</strong></span>
            <p>Start Date: ${todo.startDate || "N/A"}</p>
            <p>End Date: ${todo.endDate || "N/A"}</p>
            <p>Status: ${todo.completed ? "✅ Completed" : "⏳ Pending"}</p></div>
            <div class="card-btns"><button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button></div>
        `;

        document.querySelector(".todo-list").appendChild(todoCard);

        // Edit To-Do
        todoCard.querySelector(".edit-btn").addEventListener("click", () => {
            showTodoForm(projectName, todo, index);
        });

        // Delete To-Do
        todoCard.querySelector(".delete-btn").addEventListener("click", () => {
            projects[projectName].splice(index, 1);
            storage.saveData("projects", projects);
            showMainContent(projectName);
        });
    };

    return { showMainContent };
};

export default TodoManager;
