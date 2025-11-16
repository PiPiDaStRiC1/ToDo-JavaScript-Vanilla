import {elements} from '../dom/elements.js';

export function saveOrder() {
    const todosList = document.querySelector('.todos__list');

    const ids = [...todosList.querySelectorAll('.todo__input')]
        .map(item => Number(item.dataset.id));
    
    const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];

    // All elements which include in DOM now
    const reordered = ids
        .map(id => storageTodosList.find(([_, __, todoId]) => Number(todoId) === id));

    // Show hidden fields which don`t include in DOM now (especially important for all-sort)
    // (save to global storageTodosList in local storage)
    const remaining = storageTodosList.filter(([_, __, id]) => !ids.includes(Number(id)));

    // Save order of appearing elements -> at first visible, then hidden
    localStorage.setItem('todoList', JSON.stringify([...reordered, ...remaining]));
}

export function updateTodoSmth(...classNames) {
    let todoInputs = [];
    let todoMarks = [];
    let todoTexts = [];
    classNames.forEach(className => {
        switch(className) {
            case 'todo__input':
                todoInputs = document.querySelectorAll(`.${className}`) || [];
                break;
            case 'todo__mark':
                todoMarks = document.querySelectorAll(`.${className}`) || [];
                break;
            case 'todo__text':
                todoTexts = document.querySelectorAll(`.${className}`) || [];
                break;
        }
    })
}

export function resetParamBtns() {
    elements.sortParams.forEach(param => {
        param.classList.remove('activeBtn');
    });
    document.querySelector('.sort__param--all').classList.add('activeBtn'); 
}