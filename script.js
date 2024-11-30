document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    const filterAllBtn = document.getElementById("filter-all");
    const filterPendingBtn = document.getElementById("filter-pending");
    const filterCompletedBtn = document.getElementById("filter-completed");

    // Load tasks from localStorage on page load
    loadTasks();

    addTaskBtn.addEventListener("click", () => {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToList(task, "pending");
            saveTask(task, "pending");
            taskInput.value = ""; // Clear the input field
        }
    });

    filterAllBtn.addEventListener("click", () => filterTasks("all"));
    filterPendingBtn.addEventListener("click", () => filterTasks("pending"));
    filterCompletedBtn.addEventListener("click", () => filterTasks("completed"));

    function addTaskToList(task, status = "pending") {
        const listItem = document.createElement("li");
        listItem.className = `task-item ${status}`; // Add status as a class

        const taskText = document.createElement("span");
        taskText.textContent = task;
        taskText.className = "task-text";

        // Create the complete button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔️";
        completeBtn.className = "complete-btn";
        completeBtn.addEventListener("click", () => {
            toggleTaskStatus(task);
            listItem.classList.toggle("completed");
        });

        // Create the delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => {
            listItem.remove();
            removeTask(task);
        });

        // Append text and buttons to the list item
        listItem.appendChild(taskText);
        listItem.appendChild(completeBtn);
        listItem.appendChild(deleteBtn);

        // Add the list item to the task list
        taskList.appendChild(listItem);
    }

    function saveTask(task, status) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({ task, status });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(({ task, status }) => {
            addTaskToList(task, status);
        });
    }

    function removeTask(taskToRemove) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(({ task }) => task !== taskToRemove);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function toggleTaskStatus(taskToToggle) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((taskObj) => {
            if (taskObj.task === taskToToggle) {
                taskObj.status = taskObj.status === "pending" ? "completed" : "pending";
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function filterTasks(filter) {
        const taskItems = document.querySelectorAll(".task-item");

        taskItems.forEach((item) => {
            if (filter === "all" || item.classList.contains(filter)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        });

        // Update active filter button
        document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
        document.getElementById(`filter-${filter}`).classList.add("active");
    }
});
