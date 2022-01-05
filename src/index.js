// Settings variables that i need

const todoContainer      = document.querySelector(".todolist")
const todoInput          = document.querySelector("#search-input")
const addTodoButton      = document.querySelector("#add--btn")
const filterSelect       = document.querySelector("#filtertodo")

document.addEventListener("DOMContentLoaded", () => {
  getLocalTodos()
  checkTodosLength()
})


addTodoButton.addEventListener("click", () => addTodo())


todoContainer.addEventListener("click", (e) => {
  deleteTodo(e)
  checkTodo(e)
})

filterSelect.addEventListener("click", (e) => filterTodos(e))

const addTodo = () => {
  // Create list element
  const todo            = document.createElement("li")      // list element container
  const todoDescription = document.createElement("p")       // list element description
  const todoButtonsCont = document.createElement("div")     // buttons container
  const deleteTodoBtn   = document.createElement("button")  // delete button
  deleteTodoBtn.classList.add("fas", "fa-minus-circle")
  const checkTodoBtn    = document.createElement("button")  // check button
  checkTodoBtn.classList.add("fas", "fa-check-circle")

  // Add the input text on the description

  todoDescription.innerText = todoInput.value

  // Add todos to localStorage

  setLocalStorageTodo(todoInput.value)
  checkTodosLength()

  // Append the buttons on the div

  todoButtonsCont.append(checkTodoBtn, deleteTodoBtn)

  // // Append the description and the buttons container on the li

  todo.append(todoDescription, todoButtonsCont)

  // // Now append the li element on the ul
  todoContainer.appendChild(todo)


  todoInput.value = ""
}

const deleteTodo = (e) => {
  // get the target being clicked.
  const item = e.target

  // if is the delete button then delete the li element.
  if (item.classList.contains("fa-minus-circle")) {
    removeLocalTodos(item.parentElement.parentElement)
    checkTodosLength()
    item.parentElement.parentElement.remove()
  }
}

const checkTodo = (e) => {
  // get the target being clicked.
  const item = e.target

  // if is the delete button then check the li element.
  if (item.classList.contains("fa-check-circle")) {
    const liElement = item.parentElement.parentElement
    liElement.classList.add("checked")
  }
}

// Local Storage Settings

 /*
  1- Tengo que meter los todos al local storage,
  2- Tengo que hacer que los todos que se muestran en pantalla sean los consumidos por el local storage
 */

const setLocalStorageTodo = (todo) => {
  let todos;
  let completed;

  if (localStorage.getItem('todos') === null) {
    todos = [];
    completed = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo)

  localStorage.setItem('todos', JSON.stringify(todos))

}

const getLocalTodos = () => {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.map(todo => {
    // Create list element

    const todoEl          = document.createElement("li")      // list element container
    const todoDescription = document.createElement("p")       // list element description
    const todoButtonsCont = document.createElement("div")     // buttons container
    const deleteTodoBtn   = document.createElement("button")  // delete button
    deleteTodoBtn.classList.add("fas", "fa-minus-circle")
    const checkTodoBtn    = document.createElement("button")  // check button
    checkTodoBtn.classList.add("fas", "fa-check-circle")

    // Add the input text on the description

    todoDescription.innerText = todo


    // Append the buttons on the div

    todoButtonsCont.append(checkTodoBtn, deleteTodoBtn)

    // Append the description and the buttons container on the li

    todoEl.append(todoDescription, todoButtonsCont)

    // Now append the li element on the ul
    todoContainer.appendChild(todoEl)
  })
}

const removeLocalTodos = (todo) => {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  const todoIndex = todo.children[0].innerText;

  todos.splice(todoIndex, 1)

  localStorage.setItem('todos', JSON.stringify(todos))

}

const checkTodosLength = () => {
  console.log("this is happening")
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  if (todos.length > 5) {
    todoContainer.style.overflowY = "scroll"
  } else {
    todoContainer.style.overflowY = "hidden"
  }
}

const filterTodos = (e) => {
  const todos = todoContainer.childNodes;
  console.log(todos)
  todos.forEach(function(todo) {
    switch(e.target.value) {
      case "all":
        todo.style.display = "flex"
        break;
      case "completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex"
        } else {
          todo.style.display = "none"
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("checked")) {
          todo.style.display = "none"
        } else {
          todo.style.display = "flex"
        }
        break;
    }
  })
}