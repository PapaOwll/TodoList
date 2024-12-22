const taskInput = document.getElementById('task-input')
const dateInput = document.getElementById('date-input')
const addButton = document.getElementById('add-btn')
const editButton = document.getElementById('edit-btn')
const deleteAllBtn = document.getElementById('delete-all')
const alertMessage = document.getElementById("alert-message")
const todosBody = document.querySelector('tbody')
const filterButtons = document.querySelectorAll('.filter-button')

let todos = JSON.parse(localStorage.getItem('todos')) || [];
const generateId = () => {
    return Math.round(Math.random() * Math.random() * Math.pow(10, 15)).toString()
}
const showMessage = (message, type) => {
    alertMessage.innerHTML = "";
    const alert = document.createElement('p')
    alert.classList.remove(`alert-${type}`)
    alert.innerText = message;
    alert.classList.add('alert')
    alert.classList.add(`alert-${type}`)
    alertMessage.append(alert)
    setTimeout(() => {
        alertMessage.innerHTML = "";
    }, 2000)
}

const displayTodos = (data) => {
    const todoList = data || todos
    todosBody.innerHTML = "";
    if (!todoList.length) {
        todosBody.innerHTML = '<tr><td colspan="4">No Task Found!</td></tr> '
    } else {
        todoList.forEach(todo => {
            todosBody.innerHTML +=
                `<tr>
                            <td>${todo.task}</td>            
                            <td>${todo.date || 'No Date'}</td>            
                            <td>${todo.completed ? "Completed" : "Pending"}</td>            
                            <td>
                                <button onclick="editTodoHandler('${todo.id}')">Edit</button>
                                <button onclick="changeStatusHandler('${todo.id}')">${todo.completed ? 'Undo' : 'Do'}</button>
                                <button onclick="removeTodoHandler('${todo.id}')">Delete</button>
                            </td>            
                      </tr>`
        })
    }
}
const addHandler = () => {
    const task = taskInput.value
    const date = dateInput.value
    const todo = {
        id: generateId(),
        task,
        date,
        completed: false
    }
    if (task) {
        todos.push(todo)
        saveTodo()
        taskInput.value = ""
        dateInput.value = ""
        showMessage('Todo Added Successfully', 'success')
        displayTodos()
    } else {
        showMessage('Please Enter A Todo', 'error')
    }
}
const changeStatusHandler = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    todo.completed = !todo.completed
    saveTodo()
    displayTodos()
    showMessage('Todo Status Changed Successfully', 'success')

}
const editTodoHandler = (id) => {
    const todo = todos.find(todo => todo.id === id)
    taskInput.value = todo?.task
    dateInput.value = todo?.date
    addButton.style.display = 'none'
    editButton.style.display = 'inline-block'
    editButton.dataset.id = id
}
const applyEditHandler = (event) => {
    const id = event.target.dataset.id
    const todo = todos.find(todo => todo.id === id)
    todo.task = taskInput.value
    todo.date = dateInput.value
    taskInput.value = ''
    dateInput.value = ''
    addButton.style.display = 'inline-block'
    editButton.style.display = 'none'
    saveTodo()
    displayTodos()
    showMessage('Todo Edited Successfully', 'success')
}
const removeAllTodos = () => {
    if (todos.length) {
        todos = []
        saveTodo()
        displayTodos()
        showMessage('All Todos Deleted Successfully!', 'success')
    } else {
        showMessage('No Todos To clear!', 'error')
    }
}
const removeTodoHandler = (todoId) => {
    todos = todos.filter(todo => todo.id !== todoId)
    saveTodo()
    displayTodos()
    showMessage('Todo Deleted Successfully!', 'success')
}

const filterHandler = (event) => {
    let filteredTodos = null
    const filter = event.target.dataset.filter
    switch (filter) {
        case 'pending':
            filteredTodos = todos.filter(todo => todo.completed === false)
            break;
        case 'completed':
            filteredTodos = todos.filter(todo => todo.completed === true)
            break;
        default :
            filteredTodos = todos
            break;
    }
    displayTodos(filteredTodos)
}
const saveTodo = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

window.addEventListener('load', () => displayTodos())
addButton.addEventListener('click', addHandler)
editButton.addEventListener('click', applyEditHandler)
deleteAllBtn.addEventListener('click', removeAllTodos)
filterButtons.forEach(button => {
    button.addEventListener('click', filterHandler)
})