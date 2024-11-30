document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("date-input");
    const scheduledTaskInput = document.getElementById("scheduled-task-input");
    const addScheduledTaskBtn = document.getElementById("add-scheduled-task-btn");
    const scheduledTaskContainer = document.getElementById("scheduled-task-container");

    const scheduledTasks = JSON.parse(localStorage.getItem("scheduledTasks")) || {};

    // Load tasks from LocalStorage on page load
    loadScheduledTasks();

    addScheduledTaskBtn.addEventListener("click", () => {
        const date = dateInput.value;
        const task = scheduledTaskInput.value.trim();

        if (date && task) {
            if (!scheduledTasks[date]) {
                scheduledTasks[date] = [];
            }

            scheduledTasks[date].push(task);
            localStorage.setItem("scheduledTasks", JSON.stringify(scheduledTasks));
            renderTask(date, task);

            scheduledTaskInput.value = "";
        }
    });

    function loadScheduledTasks() {
        for (const date in scheduledTasks) {
            const tasks = scheduledTasks[date];
            tasks.forEach(task => renderTask(date, task));
        }
    }

    function renderTask(date, task) {
        // Check if the date heading exists
        let dateHeading = document.querySelector(`[data-date="${date}"]`);
        if (!dateHeading) {
            dateHeading = document.createElement("h2");
            dateHeading.textContent = formatDate(date);
            dateHeading.setAttribute("data-date", date);
            scheduledTaskContainer.appendChild(dateHeading);

            const taskList = document.createElement("ul");
            taskList.id = `tasks-${date}`;
            scheduledTaskContainer.appendChild(taskList);
        }

        const taskList = document.getElementById(`tasks-${date}`);
        const listItem = document.createElement("li");
        listItem.classList.add("task-item");

        const taskWrapper = document.createElement("div");
        taskWrapper.classList.add("task-wrapper");

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(listItem);
            scheduledTasks[date] = scheduledTasks[date].filter(t => t !== task);
            if (scheduledTasks[date].length === 0) {
                delete scheduledTasks[date];
                localStorage.setItem("scheduledTasks", JSON.stringify(scheduledTasks));
                dateHeading.remove();
                taskList.remove();
            } else {
                localStorage.setItem("scheduledTasks", JSON.stringify(scheduledTasks));
            }
        });

        taskWrapper.appendChild(document.createTextNode(task));
        taskWrapper.appendChild(deleteBtn);
        listItem.appendChild(taskWrapper);
        taskList.appendChild(listItem);
    }

    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
});
