import Todo from './domain/Todo.js'
import Presenter from './presenter/Presenter.js'
import API from './api/API.js'

const subscribeEvent = (presenter, api) => {
  const registerBtn = document.querySelector("input.todo-form__submit")
  registerBtn.addEventListener('click', (e) => {
   api.postTodo(document.getElementById("name")).then((res) => presenter.insert(new Todo(res.id, res.name, res.done)))
   e.preventDefault()

    // insertTodo()
  })
}

const main = () => {
  const serverEndpoint = "http://localhost:3000/todo"
  const presenter = new Presenter(document.querySelector("ul.todos"))
  presenter.clear()

  const api = new API(serverEndpoint)
  subscribeEvent(presenter, api);
  api.fetchTodos(serverEndpoint).then((todos)=>{
    todos.forEach(todo => {
      presenter.insert(new Todo(todo.id, todo.name, todo.done))
    })
  })
};

main();
