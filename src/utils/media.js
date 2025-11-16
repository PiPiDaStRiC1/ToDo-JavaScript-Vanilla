import {elements} from '../dom/elements.js';
import {removeTodo} from '../components/todoRemove.js';

export function handleMediaTablet(media) {
    const theme = localStorage.getItem('theme');

    switch (true) {
        case media.matches && theme === 'light':
            elements.main.classList.add('main--tablet--light');
            elements.main.classList.remove('main--tablet');
            break;

        case media.matches && theme === 'dark':
            elements.main.classList.add('main--tablet');
            elements.main.classList.remove('main--tablet--light');
            break;

        case !media.matches && theme === 'light':
            elements.main.classList.remove('main--tablet', 'main--tablet--light');
            elements.main.classList.add('main--light');
            break;

        default:
            elements.main.classList.remove('main--tablet', 'main--tablet--light', 'main--light');
    }
}

export function handleMediaMobile(media) {
    if (media.matches) {
        elements.sortParamsWrapper.classList.add('todo__params');
        elements.todoWrapper.append(elements.sortParamsWrapper);
        elements.todoWrapper.append(elements.footerText);
        appendAllCross();
    } else {
        elements.sortParamsWrapper.classList.remove('todo__params');
        elements.todosSort.insertBefore(elements.sortParamsWrapper, elements.sortCompletedClear);
        removeAllCross();
    }
};


export function appendAllCross() {
    const todoInputs = document.querySelectorAll('.todo__input');

    if (elements.mediaQueryMobile.matches) {
        todoInputs.forEach(todoInput => {
            const cross = document.createElement('button');
            cross.classList.add('todo__cross');
            todoInput.append(cross);
        });
    }
}

export function removeAllCross() {
    document.querySelectorAll('.todo__cross').forEach(cross => {
        cross.removeEventListener('click', removeTodo);
        cross.remove();
    });
}