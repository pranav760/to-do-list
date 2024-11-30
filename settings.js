document.addEventListener("DOMContentLoaded", () => {
    const notificationToggle = document.getElementById("notification-toggle");
    const taskNotificationToggle = document.getElementById("task-notification-toggle");

    notificationToggle.addEventListener("change", () => {
        alert(`Notifications are ${notificationToggle.checked ? "enabled" : "disabled"}`);
    });

    taskNotificationToggle.addEventListener("change", () => {
        alert(`Task Notifications are ${taskNotificationToggle.checked ? "enabled" : "disabled"}`);
    });
});
