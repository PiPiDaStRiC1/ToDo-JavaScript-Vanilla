import { todoCount } from "./todoCount";
import {createSmthField} from "./todoSmth"

export function removeTodo(cross) {
    let todoInputs = document.querySelectorAll('.todo__input');
    const todosList = document.querySelector('.todos__list');

    const todoId = cross.parentNode.getAttribute('data-id');
    cross.parentNode.classList.add('fadeOut');
    setTimeout(() => {
        cross.parentNode.classList.remove('fadeOut');

        // Delete node from localStorage
        const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];
        const newstorageTodosList = storageTodosList.filter(([_, className, id]) => {
            if (Number(todoId) !== Number(id)) return [_, className, id];
        });
        localStorage.setItem('todoList', JSON.stringify([...newstorageTodosList]));
    
        const removeTodoIndex = [...todoInputs].findIndex(todoInput => Number(todoInput.getAttribute('data-id')) === Number(todoId));
        todoInputs[removeTodoIndex].remove(); // delete node from DOM
        todoInputs = [...todoInputs].filter((_, index) => index !== removeTodoIndex); // delete node from todoInputs
    
        if (todosList.children.length === 0) {
            createSmthField("Add something...", 0);
        }
    
        todoCount();
    }, 480)
}