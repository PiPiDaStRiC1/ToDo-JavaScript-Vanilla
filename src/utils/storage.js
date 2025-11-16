export function changeTextInStorage() {
    const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
    const newTodoListStorage = todoListStorage.map(([text, className, id]) => {
        if (Number(this.parentNode.getAttribute('data-id')) === Number(id)) {
            return [this.value, className, id];
        }
        return [text, className, id];
    });
    localStorage.setItem('todoList', JSON.stringify(newTodoListStorage));
}