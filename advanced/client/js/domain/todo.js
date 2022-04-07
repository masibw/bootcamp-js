class Todo {
    #id
    #name
    #done

    constructor(id, name, done) {
        this.#id = id;
        this.#name = name;
        this.#done = done;
    }

    get id() {
        return this.#id
    }

    get name() {
        return this.#name
    }

    /**
     * @throws {"名前は1文字以上である必要があります"}
     */
    set name(value) {
        if (value.length < 1) {
            throw new Error("名前は1文字以上である必要があります")
        }
        this.#name = value
    }

    get done() {
        return this.#done
    }

    set done(value) {
        this.#done = value
    }
}

export default Todo;