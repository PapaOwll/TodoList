const adBtn = document.getElementById("addBtn");
const dlBtn = document.getElementById("delBtn");
const list = document.getElementById("parent");
const entryInput = document.getElementById("todoInput");
const todos = getTodos();
printTodos(todos);
// Get Todos List
function getTodos() {
  const todos = !localStorage.getItem("todos")
    ? []
    : JSON.parse(localStorage.getItem("todos"));
  return todos;
}
// Print Todos
function printTodos(todos) {
  list.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    list.insertAdjacentHTML(
      "beforeend",
      `<div class="d-flex mt-2">
             <input ${
               todos[i].isCompeleted ? "checked" : ""
             } onchange="checkTodos(${i})"  type="checkbox" class="d-flex m-2">
              ${todos[i].todo}
              <button class="btn btn-danger float-right mx-2" onclick="delTodo(${i})" id="delInList">Delete</button>
                </div>`
    );
  }
}
// add todo in list and localstorage
function addTodo(title) {
  const todos = getTodos();
  todos.push({
    todo: title,
    isCompeleted: false,
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  printTodos(todos);
}
adBtn.addEventListener("click", () => {
  addTodo(entryInput.value);
  entryInput.value = "";
});
// delete todo of list and localstorage
function delTodo(id) {
  const todos = getTodos();
  todos.splice(id, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  printTodos(todos);
}
// delete whole list and refresh list
function clearTodos() {
  const todos = [];
  printTodos([]);
  localStorage.setItem("todos", JSON.stringify(todos));
}
// check compelete
function checkTodos(index) {
  const todos = getTodos();
  todos[index].isCompeleted = !todos[index].isCompeleted;
  localStorage.setItem("todos", JSON.stringify(todos));
}
