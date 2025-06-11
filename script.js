const task = [];
const taskInput = document.getElementById("taskInput");
// for (i = 0; i < task.length; i++) {
//   const task = [i];
//   task[i];
// }

// console.log(task);

function checkInput() {
  if (taskInput.value.trim() === "") {
    alert("input a value");
    return false;
  }
  return true;
}

function addTask() {
  if (!checkInput()) {
    return;
  }

  const content = {
    name: taskInput.value,
    status: "Incomplete",
    // "priority": ""
  };
  task.push(content);

  const listItem = document.createElement("li");

  const leftGroup = document.createElement("span");
  leftGroup.className = "task-text-group";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const deletebtn = document.createElement("button");
  deletebtn.textContent = "Delete";
  deletebtn.className = "delete-button";

  deletebtn.addEventListener("click", () => {
    listItem.remove();
  });

  checkbox.addEventListener("change", (event) => {
    content.status = event.target.checked ? "Complete" : "Incomplete";
    console.log(`${content.name} marked as ${content.status}`);
  });

  const label = document.createElement("label");
  label.textContent = content.name;
  label.className = "task-label";

  leftGroup.appendChild(checkbox);
  leftGroup.appendChild(label);

  listItem.appendChild(leftGroup);
  listItem.appendChild(deletebtn);

  document.querySelector(".js-to-do-list").appendChild(listItem);
  taskInput.value = "";
}

// function deleteTask() {
//   const deletebtn = document.createElement("button");
//   console.log(deletebtn);
// }

document.querySelector(".js-add-task").addEventListener("click", () => {
  addTask();
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
