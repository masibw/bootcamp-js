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
    })
  })
  subscribeEvent(presenter, api);
};

main();
