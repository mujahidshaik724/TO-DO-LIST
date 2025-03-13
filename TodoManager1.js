import UIHelper from "./UiHandler.js";
import StorageHelper from "./StorageHandler.js";

const TodoManager = (mainContainer, projects) => {
    const ui = UIHelper();
    const storage = StorageHelper();

    const showMainContent = (projectName) => {
        mainContainer.innerHTML = `
            <h2>${projectName}</h2>
            <button class="add-todo-btn">Add To-Do</button>
            <div class="todo-form-container"></div> <!-- New container for the form -->
            <ul class="todo-list"></ul>
        `;

        projects[projectName].forEach(todo => addTodoCard(todo, projectName));
        document.querySelector(".add-todo-btn").addEventListener("click", () => showTodoForm(projectName));
    };

    const showTodoForm = (projectName, existingTodo = null, index = null) => {
        if (document.querySelector(".todo-form")) return; // Prevent multiple forms

        const form = ui.createForm(
            [
                { type: "text", placeholder: "To-Do Name", className: "todo-name-input", value: existingTodo ? existingTodo.name : "" },
                { type: "date", className: "todo-start-input", value: existingTodo ? existingTodo.startDate : "" },
                { type: "date", className: "todo-end-input", value: existingTodo ? existingTodo.endDate : "" },
                { type: "checkbox", className: "todo-completed-input", checked: existingTodo ? existingTodo.completed : false }
            ],
            [
                { text: existingTodo ? "Update" : "Confirm", className: "confirm-btn", onClick: () => saveTodo(projectName, form, existingTodo, index) },
                { text: "Cancel", className: "cancel-btn", onClick: () => form.remove() }
            ]
        );

        form.classList.add("todo-form");

        // Insert form inside the dedicated container (below the button)
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
            <span><strong>${todo.name}</strong></span>
            <p>Start: ${todo.startDate || "N/A"} | End: ${todo.endDate || "N/A"}</p>
            <p>Status: ${todo.completed ? "✅ Completed" : "⏳ Pending"}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
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
