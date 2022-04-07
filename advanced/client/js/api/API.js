class API {
    #url

    constructor(url){
        this.#url = url
    }

    async fetchTodos(url){
        const res = await fetch(url,{
          headers: {
            "Content-Type": "application/json",
          }
        }).then((res) => res.json())
        
      return  res.todoList
    }

    async postTodo(name){
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
}

export default API;