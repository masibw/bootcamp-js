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
                id="todo-toggle"
                class="todo-toggle"
                ${todo.done ? "checked" : ""}
                />
                <span class="todo-toggle__checkmark"></span>
            </label>
            <input type="text" id="todo-name-input" class="todo-name" style="display:none;"></input>
            <div id="todo-name-label" class="todo-name"></div>
            <div data-todo-id="${todo.id}" id="todo-remove-button" class="todo-remove-button">x</div>
        `
        const li = document.createElement('li')
        li.className = "todo-item";
        li.innerHTML = template;
        li.querySelector("#todo-name-label").innerText = todo.name
        this.#todoList.appendChild(li)
        return li
    }

    clear() {
        while (this.#todoList.firstChild) {
            this.#todoList.removeChild(this.#todoList.firstChild);
        }
    }

    delete(dom) {
        dom.parentNode.removeChild(dom)
    }
}

export default Presenter