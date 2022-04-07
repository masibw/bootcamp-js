class Presenter {

    #todoList

    constructor(todoList) {
        this.#todoList = todoList
    }

    insert(todo) {
        const template =
            `<label class="todo-toggle__container">
                <input
                data-todo-id="${todo.id}"
                type="checkbox"
                class="todo-toggle"
                ${todo.done ? "checked" : ""}
                />
                <span class="todo-toggle__checkmark"></span>
            </label>
            <div class="todo-name"></div>
            <div data-todo-id="${todo.id}" class="todo-remove-button">x</div>
        `
        const li = document.createElement('li')
        li.className = "todo-item";
        li.innerHTML = template;
        li.querySelector(".todo-name").innerText = todo.name
        this.#todoList.appendChild(li)
        return li
    }

    clear() {
        while (this.#todoList.firstChild) {
            this.#todoList.removeChild(this.#todoList.firstChild);
        }
    }
}

export default Presenter