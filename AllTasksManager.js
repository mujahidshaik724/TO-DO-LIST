// AllTasksManager.js
import StorageHelper from "./StorageHandler.js";

const AllTasksManager = (mainContainerSelector) => {
    const storage = StorageHelper();
    const mainContainer = document.querySelector(mainContainerSelector);

    const showAllTasks = () => {
        const projects = storage.getData("projects");
        mainContainer.innerHTML = "<h2>All Tasks</h2><ul class='all-tasks-list'></ul>";
        
        const allTasksList = mainContainer.querySelector(".all-tasks-list");

        Object.keys(projects).forEach(projectName => {
            projects[projectName].forEach(todo => {
                const taskItem = document.createElement("li");
                taskItem.classList.add("task-card");
                taskItem.innerHTML = `
                    <strong>${todo.name}</strong> - <em>${projectName}</em>
                    <p>Start: ${todo.startDate || "N/A"} | End: ${todo.endDate || "N/A"}</p>
                    <p>Status: ${todo.completed ? "✅ Completed" : "❌ Not Completed"}</p>
                `;
                allTasksList.appendChild(taskItem);
            });
        });
    };

    return { showAllTasks };
};

export default AllTasksManager;
