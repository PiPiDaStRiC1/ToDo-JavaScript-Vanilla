import {elements} from '../dom/elements.js';

export function removeSmthField() {
    const smth = document.querySelector('.todo__smth');
    smth ? smth.remove() : null;
}

export function createSmthField(inText, inputCount) {
    const smth = document.createElement('li');
    if (inputCount === 0) {
        smth.classList.add('todo__smth');
        smth.classList.add('fadeIn');
        smth.innerText = inText;
        elements.todosList.append(smth);

        const theme = localStorage.getItem('theme');
        if (theme === 'light') {
            smth.classList.add('todo__smth--light')
        } else {
            smth.classList.remove('todo__smth--light')
        }

    } else {
        smth.remove();
    };
}