import {elements} from './elements.js';
import { saveOrder } from '../components/todoUpdate.js';

let saveTimeout = null;
const SAVE_DELAY = 120; 

// Plan save with SAVE_DELAY
function scheduleSave() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveOrder();
        saveTimeout = null;
    }, SAVE_DELAY);
}

// Quick save with timer reset
function flushSave() {
    if (saveTimeout) {
        clearTimeout(saveTimeout);
        saveTimeout = null;
    }
    saveOrder();
}

export function attachDragEvents() {

    elements.todosList.addEventListener('mousedown', (event) => {
        document.querySelectorAll(".todo__input").forEach((item) => {
            item.style.border = '1px solid transparent';
            item.style.borderBottom = '1px solid #666666';
        });

        const item = event.target.closest('.todo__input');
        item?.blur();

        if (!item) return;

        item.setAttribute('draggable', 'true');
        item.classList.add('selected');
            
        item.style.border = '1px dashed #83aaf8ff';
    });

    elements.todosList.addEventListener("mouseup", (event) => {
        const item = event.target.closest(".todo__input");
        if (!item) return;

        item.classList.remove("selected");
        item.removeAttribute("draggable");

        item.style.border = '1px solid transparent';
        item.style.borderBottom = '1px solid #666666';
          
        flushSave();
    });

    /* Mobile Drag-and-Drop */
    
    // elements.todosList.addEventListener('touchstart', (event) => {
    //     document.querySelectorAll(".todo__input").forEach((item) => {
    //         item.style.border = '1px solid transparent';
    //         item.style.borderBottom = '1px solid #666666';
    //     });

        
    //     const item = event.target.closest('.todo__input');
    //     item?.blur();
        
    //     setTimeout(() => {
    //         if (!item) return;

    //         item.setAttribute('draggable', 'true');
    //         item.classList.add('selected');
            
    //     }, 1000)
    //     item.style.border = '1px dashed #83aaf8ff';
    // });

    // elements.todosList.addEventListener("touchend", (event) => {
    //     const item = event.target.closest(".todo__input");
    //     if (!item) return;

    //     item.removeAttribute("draggable");
    //     item.classList.remove("selected");

    //     item.style.border = '1px solid transparent';
    //     item.style.borderBottom = '1px solid #666666';

    //     flushSave();
    // });

    elements.todosList.addEventListener('dragstart', (e) => {
        const item = e.target.closest('.todo__input');
        if (!item) return;

        item.classList.add('selected');
    });

    elements.todosList.addEventListener('dragend', (e) => {
        const item = e.target.closest('.todo__input');
        if (item) {
            item.classList.remove('selected');
            item.removeAttribute('draggable');
        }

        flushSave();
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

        scheduleSave();
    });
}