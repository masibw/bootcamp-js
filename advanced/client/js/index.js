import Todo from './domain/Todo.js'
import Presenter from './presenter/Presenter.js'
import API from './api/API.js'

const subscribeEvent = (presenter, api) => {
  const registerBtn = document.querySelector("input.todo-form__submit")
  registerBtn.addEventListener('click', (e) => {
    api.postTodo(document.getElementById("name")).then((res) => presenter.insert(new Todo(res.id, res.name, res.done)))
    e.preventDefault()
  })
}

const main = () => {
  const serverEndpoint = "http://localhost:3000/todo"
  const presenter = new Presenter(document.querySelector("ul.todos"))
  presenter.clear()

  const api = new API(serverEndpoint)
  api.fetchTodos(serverEndpoint).then((res) => {
    const todos = res.map((todo) => new Todo(todo.id, todo.name, todo.done))
    todos.forEach(todo => {
      const todoDom = presenter.insert(new Todo(todo.id, todo.name, todo.done))
      todoDom.querySelector(`#todo-toggle`).addEventListener("change", (e) => {
        todo.done = e.target.checked
        api.updateTodo(todo)
      })

      todoDom.querySelector(`#todo-remove-button`).addEventListener("click", (e) => {
        api.deleteTodo(todo)
        presenter.delete(todoDom)
      })

      const nameLabel = todoDom.querySelector('#todo-name-label')

      nameLabel.addEventListener('click', () => {
        nameLabel.style.display = 'none'
        const nameInput = todoDom.querySelector("#todo-name-input")
        nameInput.style.display = ''
        nameInput.value = nameLabel.innerText
        nameInput.focus()

        nameInput.addEventListener('blur', () => {
          try {
            todo.name = nameInput.value
            nameLabel.style.display = ''
            nameInput.style.display = 'none'
            nameLabel.innerText = nameInput.value

            api.updateTodo(todo)
          } catch (error) {
            console.log(error)
          }
        })
      })

    })
  })
  subscribeEvent(presenter, api);
};

main();
