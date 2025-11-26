import {elements} from './elements.js';
import { saveOrder } from '../components/todoUpdate.js';

export function attachDragEvents() {

    elements.todosList.addEventListener('mousedown', (event) => {
        document.querySelectorAll(".todo__input").forEach((item) => {
            item.style.border = '1px solid transparent';
            item.style.borderBottom = '1px solid #666666';
        });

        const item = event.target.closest('.todo__input');
            
        setTimeout(() => {
            if (!item) return;

            item.setAttribute('draggable', 'true');
            item.classList.add('selected');
            
        }, 1000)
        item.style.border = '1px dashed #83aaf8ff';
    });

    elements.todosList.addEventListener("mouseup", (event) => {
        const item = event.target.closest(".todo__input");
        if (!item) return;

        item.classList.remove("selected");
        item.removeAttribute("draggable");

        item.style.border = '1px solid transparent';
        item.style.borderBottom = '1px solid #666666';

        saveOrder();
    });


    elements.todosList.addEventListener('touchstart', (event) => {
        document.querySelectorAll(".todo__input").forEach((item) => {
            item.style.border = '1px solid transparent';
            item.style.borderBottom = '1px solid #666666';
        });

        const item = event.target.closest('.todo__input');
            
        setTimeout(() => {
            if (!item) return;

            item.setAttribute('draggable', 'true');
            item.classList.add('selected');
            
        }, 1000)
        item.style.border = '1px dashed #83aaf8ff';
    });

    elements.todosList.addEventListener("touchend", (event) => {
        const item = event.target.closest(".todo__input");
        if (!item) return;

        item.classList.remove("selected");
        item.removeAttribute("draggable");

        item.style.border = '1px solid transparent';
        item.style.borderBottom = '1px solid #666666';

        saveOrder();
    });

    elements.todosList.addEventListener('dragover', (event) => {
        event.preventDefault();

        const selected = document.querySelector('.selected');
        if (!selected) return;

        const target = event.target.closest('.todo__input');
        if (!target || selected === target) return;

        const bounding = target.getBoundingClientRect();
        const offset = event.clientY - bounding.top; 

        if (offset < bounding.height / 2) {
            elements.todosList.insertBefore(selected, target);
        } else {
            elements.todosList.insertBefore(selected, target.nextElementSibling);
        }
    });
}
