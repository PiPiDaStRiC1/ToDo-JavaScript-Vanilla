import {elements} from '../dom/elements.js';
import {removeTodo} from '../components/todoRemove.js';


function createFooterText() {
    const footerText = document.createElement('p');
    footerText.classList.add('todo__footer_text');
    footerText.textContent = 'Drag and drop to reorder list';
    return footerText;
}

function removeFooterText() {
    const footerText = document.querySelectorAll('.todo__footer_text');
    footerText.forEach(text => text.remove());
}

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
        removeFooterText();
        appendAllCross();
    } else {
        elements.sortParamsWrapper.classList.remove('todo__params');
        elements.todosSort.insertBefore(elements.sortParamsWrapper, elements.sortCompletedClear);
        elements.todoWrapper.append(createFooterText());
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