// Settings variables that i need

const todoContainer      = document.querySelector(".todolist")

const todoInput          = document.querySelector("#search-input")
const addTodoButton      = document.querySelector("#add--btn")



addTodoButton.addEventListener("click", () => addTodo())
todoContainer.addEventListener("click", (e) => deleteTodo(e))

const addTodo = () => {
  // Create list element

  const todo            = document.createElement("li")      // list element container
  const todoDescription = document.createElement("p")       // list element description
  const todoButtonsCont = document.createElement("div")     // buttons container
  const deleteTodoBtn   = document.createElement("button")  // delete button
  deleteTodoBtn.classList.add("fas", "fa-minus-circle")
  const checkTodoBtn    = document.createElement("button")  // check button
  checkTodoBtn.classList.add("fas", "fa-plus-circle")

  // Add the input text on the description

  todoDescription.innerText = todoInput.value

  // Append the buttons on the div

  todoButtonsCont.append(checkTodoBtn, deleteTodoBtn)

  // Append the description and the buttons container on the li

  todo.append(todoDescription, todoButtonsCont)

  // Now append the li element on the ul
  todoContainer.appendChild(todo)


  todoInput.value = ""

}

const deleteTodo = (e) => {
  // get the target being clicked.
  const item = e.target

  // if is the delete button then delete the li element.
  if (item.classList.contains("fa-minus-circle")) item.parentElement.parentElement.remove()
  
}