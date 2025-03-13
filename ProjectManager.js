// ProjectManager.js
import StorageHelper from "./StorageHandler.js";
import UIHelper from "./UiHandler.js";
import TodoManager from "./TodoManager1.js";

const ProjectManager = (containerSelector, addBtnSelector, mainContainerSelector) => {
    const storage = StorageHelper();
    const ui = UIHelper();
    const projects = storage.getData("projects") || {};
    const projectContainer = document.querySelector(containerSelector);
    const addProjectBtn = document.querySelector(addBtnSelector);
    const mainContainer = document.querySelector(mainContainerSelector);
    const todoManager = TodoManager(mainContainer, projects);

    // Create a dedicated div for the project form (keeps form static)
    const formContainer = document.createElement("div");
    formContainer.classList.add("project-form-container");
    projectContainer.parentElement.insertBefore(formContainer, projectContainer); // Insert above the list

    const renderProjects = () => {
        projectContainer.innerHTML = "";
        Object.keys(projects).forEach(addProjectCard);
    };

    const createProjectForm = () => {
        // Prevent multiple forms
        if (formContainer.innerHTML.trim() !== "") return;
    
        const form = ui.createForm(
            [{ type: "text", placeholder: "Enter project name", className: "project-name-input" }],
            [
                { text: "Confirm", className: "confirm-btn", onClick: saveProject },
                { text: "Cancel", className: "cancel-btn", onClick: () => form.remove() } // Removes the form
            ]
        );
    
        form.classList.add("project-form");
        formContainer.appendChild(form); // Append the form inside the container
    };
    
    

    const saveProject = () => {
        const inputField = document.querySelector(".project-name-input");
        const projectName = inputField.value.trim();
    
        if (!projectName) return;
    
        if (!projects[projectName]) projects[projectName] = [];
        storage.saveData("projects", projects);
    
        formContainer.innerHTML = ""; // Remove form after saving
        renderProjects();
    };
    

    const addProjectCard = (projectName) => {
        const projectCard = document.createElement("li");
        projectCard.classList.add("project-card");
        projectCard.innerHTML = `
            <span class="project-title" cursor:pointer>${projectName}</span>
           <div class="button-container"> <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button></div>
        `;
        projectContainer.appendChild(projectCard);

        projectCard.addEventListener("click", () => todoManager.showMainContent(projectName));

        projectCard.querySelector(".edit-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            showEditForm(projectName, projectCard);
        });

        projectCard.querySelector(".delete-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            delete projects[projectName];
            storage.saveData("projects", projects);
            renderProjects();
        });
    };

    const showEditForm = (existingName, projectCard) => {
        const editForm = ui.createForm(
            [{ type: "text", placeholder: "Edit project name", value: existingName, className: "project-name-input" }],
            [
                { text: "Save", className: "confirm-btn", onClick: () => saveEdit(existingName, editForm) },
            ]
        );

        formContainer.innerHTML = ""; // Remove previous form
        formContainer.appendChild(editForm);
    };

    const saveEdit = (oldName, form) => {
        const newName = form.querySelector(".project-name-input").value.trim();
        if (newName && newName !== oldName) {
            projects[newName] = projects[oldName];
            delete projects[oldName];
            storage.saveData("projects", projects);
            renderProjects();
        }
        formContainer.innerHTML = "";
    };

    addProjectBtn.addEventListener("click", createProjectForm);
    renderProjects();
};

export default ProjectManager;
