const API_BASE = "/api";

// DOM Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task on button click
addBtn.addEventListener("click", addTask);

// Add task on Enter key
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Load all tasks from API
async function loadTasks() {
  try {
    taskList.innerHTML = '<div class="loading">Loading tasks...</div>';

    const response = await fetch(`${API_BASE}/task`);
    const tasks = await response.json();

    taskList.innerHTML = "";

    if (tasks.length === 0) {
      taskList.innerHTML =
        '<div class="empty-state">No tasks yet. Add one above! 🎯</div>';
      return;
    }

    tasks.forEach((task) => renderTask(task));
  } catch (error) {
    console.error("Error loading tasks:", error);
    taskList.innerHTML =
      '<div class="empty-state">Error loading tasks. Please refresh the page.</div>';
  }
}

// Add a new task
async function addTask() {
  const title = taskInput.value.trim();

  if (!title) {
    taskInput.focus();
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const newTask = await response.json();

    if (taskList.querySelector(".empty-state")) {
      taskList.innerHTML = "";
    }

    renderTask(newTask);
    taskInput.value = "";
    taskInput.focus();
  } catch (error) {
    console.error("Error adding task:", error);
    alert("Failed to add task. Please try again.");
  }
}

// Toggle task completion
async function toggleTask(id, taskElement) {
  try {
    const response = await fetch(`${API_BASE}/task/${id}`, {
      method: "PATCH",
    });

    const updatedTask = await response.json();

    if (updatedTask.completed) {
      taskElement.classList.add("completed");
    } else {
      taskElement.classList.remove("completed");
    }
  } catch (error) {
    console.error("Error toggling task:", error);
    alert("Failed to update task. Please try again.");
  }
}

// Render a single task
function renderTask(task) {
  const taskItem = document.createElement("div");
  taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
  taskItem.dataset.id = task.id;

  taskItem.innerHTML = `
        <div class="task-checkbox"></div>
        <div class="task-text">${escapeHtml(task.title)}</div>
    `;

  taskItem.addEventListener("click", () => {
    toggleTask(task.id, taskItem);
  });

  taskList.appendChild(taskItem);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
