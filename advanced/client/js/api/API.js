class API {
    #url

    constructor(url) {
        this.#url = url
    }

    async fetchTodos(url) {
        const res = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => res.json())

        return res.todoList
    }

    async postTodo(name) {
        const data = {
            name: name.value
        }
        const res = await fetch("http://localhost:3000/todo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
        return res
    }

    async updateTodo(todo) {
        const data = {
            name: todo.name,
            done: todo.done,
        }
        const res = await fetch(`http://localhost:3000/todo/${todo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then(res => res.json())
        return res
    }

    async deleteTodo(todo) {
        const res = await fetch(`http://localhost:3000/todo/${todo.id}`, {
            method: 'DELETE',
        })
        return res
    }
}

export default API;