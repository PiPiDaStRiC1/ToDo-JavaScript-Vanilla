export function todoCount() {
    const todoInputs = document.querySelectorAll('.todo__input');

    let itemCount = 0;
    const todoCounts = document.querySelector('.todos__sort_left');
    todoInputs.forEach(_ => itemCount++);
    todoCounts.innerText = `${itemCount} items left`;
}