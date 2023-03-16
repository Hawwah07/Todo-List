// retrieve the list from local storage, or create an empty array
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];


function renderList() {
  const list = document.getElementById("todo-list");

  list.innerHTML = "";

  for (let i = todoList.length - 1; i >= 0; i--) {
    const todo = todoList[i];
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox" class="checkbox" ${todo.completed ? "checked" : ""}>
        <span>${todo.text}</span>
      </label>
      <button class="delete-button">Delete</button>
    `;
    const checkbox = li.querySelector(".checkbox");
    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveList();
    });
    const deleteButton = li.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
      todoList.splice(i, 1);
      saveList();
      renderList();
    });
    list.appendChild(li);
  }
}

// save the list to local storage
function saveList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

// handle the form submission
const form = document.getElementById("todo-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (text !== "") {
    todoList.push({ text, completed: false });
    saveList();
    renderList();
    input.value = "";
  }
});

// render the initial list
renderList();
