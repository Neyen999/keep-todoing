// Solución bluuweb

const todoContainer      = document.querySelector(".todolist")
const form               = document.querySelector("#form")
const total              = document.querySelector("#progress")
const todoInput          = document.querySelector("#search-input")
const filterSelect       = document.querySelector("#filtertodo")
const template           = document.querySelector("#template").content
const fragment           = document.createDocumentFragment()

let completedTaks        = 0

// Creo una colección de objetos vacio donde voy a guardar mis todos

let todos = {}

// Cargo los todos guardados

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tareas")) {
    todos = JSON.parse(localStorage.getItem("tareas"))
  }
  if (localStorage.getItem("completed")) {
    completedTaks = JSON.parse(localStorage.getItem("completed"))
  }
  checkCompletedTaks(completedTaks)
  printTasks()
})

// Hago el filtro

filterSelect.addEventListener("click", (e) => filterTodos(e))

// Prevent default del formulario

form.addEventListener("submit", (e) => {
  e.preventDefault()

  setTask()
});

// Capturas los eventos de delete y check
todoContainer.addEventListener("click", (e) => stateTask(e))

const setTask = () => {
  if (todoInput.value.trim() === "") {
    console.log('esta vacio')
    return
  }
 
  const tarea = {
    id: Date.now(),
    texto: todoInput.value,
    completado: false
  }

  todos[tarea.id] = tarea

  // console.log(todos)

  form.reset()
  todoInput.focus()


  printTasks()
  checkCompletedTaks(completedTaks)
}

const printTasks = () => {

  localStorage.setItem("tareas", JSON.stringify(todos))

  if (Object.values(todos).length === 0) {
    todoContainer.innerHTML = `
      <div style="height: 50px" class="rounded text-light d-flex align-items-center justify-content-center bg-dark">
        <p class="m-0">Añade una tarea</p>
      </diV>
    `
    return
  }

  if (Object.values(todos).length > 5) {
    console.log("here")
    todoContainer.style.overflowY = "scroll"
  } else {
    todoContainer.style.overflowY = "hidden"
  }

  todoContainer.innerHTML = null
  Object.values(todos).forEach(item => {
    const clone = template.cloneNode(true)
    clone.querySelector("p").textContent = item.texto
    clone.querySelector("p").classList.add("m-0")
    clone.querySelector("li").classList.add("d-flex", "align-items-center", "justify-content-between", "p-2")

    if (item.completado) {
      clone.querySelector("p").classList.add("checked", "text-decoration-line-through")
      clone.querySelectorAll(".fas")[0].classList.add("checkedicon")
    }

    // en el dataset le agrego el id del elemento que luego voy a consumir
    clone.querySelectorAll(".fas")[0].dataset.id = item.id
    clone.querySelectorAll(".fas")[1].dataset.id = item.id
    fragment.appendChild(clone)
  })

  todoContainer.appendChild(fragment)
}

const stateTask = (e) => {

  if (e.target.classList.contains("check")) {
    todos[e.target.dataset.id].completado = true
    if (completedTaks == Object.values(todos).length) {
      completedTaks = Object.values(todos).length
      return
    }
    completedTaks++
    localStorage.setItem("completed", JSON.stringify(completedTaks))
    checkCompletedTaks(completedTaks)
    printTasks()
  }
  
  if (e.target.classList.contains("delete")) {
    delete todos[e.target.dataset.id]
    if (completedTaks !== 0) {
      completedTaks--
      localStorage.setItem("completed", JSON.stringify(completedTaks))
      checkCompletedTaks(completedTaks)
    }

    checkCompletedTaks(completedTaks)

    printTasks()
  }

  e.stopPropagation()
}

const filterTodos = (e) => {
  const todos = todoContainer.children
  Array.from(todos).forEach(function(todo) {
    let paragraph = todo.querySelector("p")
    console.log(paragraph)

    switch (e.target.value) {
      case "completed":
        if (!paragraph.classList.contains("checked")) {
          todo.classList.add("d-none")
        } else {
          todo.classList.remove("d-none")
        }
        break;
      case "all":
        todo.classList.remove("d-none")
        break;
      case "uncompleted": 
      if (paragraph.classList.contains("checked")) {
        todo.classList.add("d-none")
      } else {
        todo.classList.remove("d-none")
      }
      break;
    }
  })
}

const checkCompletedTaks = (completed) => {
  total.innerText = `${completed} / ${Object.values(todos).length}`
}