// main.js
import ProjectManager from "./ProjectManager.js";
import AllTasksManager from "./AllTasksManager.js";

document.addEventListener("DOMContentLoaded", () => {
    const projectManager = ProjectManager(".project-btn-container ul", ".add-project-btn", "main");
    const allTasksManager = AllTasksManager("main");

    document.querySelector(".all-tasks-btn").addEventListener("click", () => {
        allTasksManager.showAllTasks();
    });
});
