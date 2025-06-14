//Variables
let tasks = [];
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach((task) => {
      addTaskToDom(task);
    });
  }
});
//const taskInput = document.getElementById("taskInput");
//Functions

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function checkInput() {
  if (taskInput.value.trim() === "") {
    alert("input a value");
    return false;
  }
  return true;
}

function addTaskToDom(content) {
  // if (!checkInput()) {
  //   return;
  // }

  // const content = {
  //   name: taskInput.value,
  //   status: "Incomplete",
  //   // "priority": ""
  // };
  //tasks.push(content);

  const listItem = document.createElement("li");

  const leftGroup = document.createElement("span");
  leftGroup.className = "task-text-group";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = content.status === "Complete";

  const deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";
  deletebtn.className = "delete-button";

  deletebtn.addEventListener("click", () => {
    listItem.remove();
    tasks = tasks.filter((task) => task !== content);
    saveToLocalStorage();
  });

  checkbox.addEventListener("change", (event) => {
    content.status = event.target.checked ? "Complete" : "Incomplete";
    saveToLocalStorage();
  });

  const label = document.createElement("label");
  label.textContent = content.name;
  label.className = "task-label";

  leftGroup.appendChild(checkbox);
  leftGroup.appendChild(label);

  listItem.appendChild(leftGroup);
  listItem.appendChild(deletebtn);

  document.querySelector(".js-to-do-list").appendChild(listItem);
}

// function deleteTask() {
//   const deletebtn = document.createElement("button");
//   console.log(deletebtn);
// }

document.querySelector(".js-add-task").addEventListener("click", () => {
  const input = document.getElementById("taskInput");
  const taskName = input.value.trim();

  if (taskName !== "") {
    task = { name: taskName, status: "Incomplete" };
    tasks.push(task);
    addTaskToDom(task);
    saveToLocalStorage();
  }
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const input = document.getElementById("taskInput");
    const taskName = input.value.trim();

    if (taskName !== "") {
      task = { name: taskName, status: "Incomplete" };
      tasks.push(task);
      addTaskToDom(task);
      saveToLocalStorage();
    }
  }
});
