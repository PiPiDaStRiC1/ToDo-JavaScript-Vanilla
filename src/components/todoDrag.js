import {elements} from '../dom/elements.js';
import { saveOrder } from './todoUpdate.js';

export function attachDragEvents() {
    elements.todosList.addEventListener('dragstart', (event) => {
        if (event.target.classList.contains('todo__input'))
            event.target.classList.add('selected');
    });
    elements.todosList.addEventListener('dragend', (event) => {
        if (event.target.classList.contains('todo__input')) {
            event.target.classList.remove('selected');
            saveOrder();
        }
    });
    elements.todosList.addEventListener('dragover', (event) => {
        event.preventDefault();
    
        const selectedElement = document.querySelector('.selected');
        const currentElement = event.target;
        const itemHeight = selectedElement.offsetHeight;
        const clientY = event.offsetY; // client Y position in element
    
        if (selectedElement !== currentElement && currentElement.classList.contains('todo__input')) {
    
            if (clientY < itemHeight / 2) { 
                // if client Y position < itemHeight / 2 -> add element before nextElementSibling
                const nextElement = (currentElement === selectedElement.nextElementSibling) ? 
                    selectedElement.nextElementSibling :
                    currentElement;
        
                elements.todosList.insertBefore(nextElement, selectedElement);
            } else { 
                // if client Y position >= itemHeight / 2 -> add element before previousElementSibling
                const nextElement = (currentElement === selectedElement.previousElementSibling) ? 
                    selectedElement.previousElementSibling :
                    currentElement;
        
                elements.todosList.insertBefore(selectedElement, nextElement);
            } 
            
        }
    });
}