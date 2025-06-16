//Variables
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const allTasksList = document.getElementById("allTasksList");

let currentFilter = "all";

//Function, save to local storage

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.tab;
    renderTasks();
  });
});

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  }
});

function renderTasks() {
  allTasksList.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      (currentFilter === "completed" && !task.completed) ||
      (currentFilter === "incomplete" && task.completed)
    ) {
      return;
    }

    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    if (task.completed) {
      taskText.classList.add("completed");
    }

    const doneBtn = document.createElement("button");
    doneBtn.textContent = task.completed ? "undo" : "done";
    doneBtn.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.classList.add("edit-input");

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          tasks[index].text = input.value.trim();
          saveTasks();
          renderTasks();
        }
      });

      input.addEventListener("blur", () => {
        tasks[index].text = input.value.trim();
        saveTasks();
        renderTasks();
      });

      li.replaceChild(input, taskText);
      input.focus();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    const container = document.createElement("div");
    container.className = "actions";
    container.appendChild(doneBtn);
    container.appendChild(editBtn);
    container.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(container);

    allTasksList.appendChild(li);
  });
}

renderTasks();
