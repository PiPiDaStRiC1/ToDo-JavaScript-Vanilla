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
        if (item) {
            item.blur();
        }

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


    let touchHoldTimer = null;
    const TOUCH_HOLD = 450; 
    const MOVE_THRESHOLD = 12; 
    let touchStartX = 0;
    let touchStartY = 0;
    let touchItem = null;
    let draggingTouch = false;

    function clearTouchHold() {
        if (touchHoldTimer) {
            clearTimeout(touchHoldTimer);
            touchHoldTimer = null;
        }
    }

    function startTouchDrag(item) {
        if (!item) return;
        draggingTouch = true;
        const input = item.querySelector('.todo__text');
        input?.blur();
        input?.setAttribute('readonly', 'true');
        item.setAttribute('draggable', 'true');
        item.classList.add('selected');
    }

    function endTouchDrag(item) {
        if (!item) return;
        draggingTouch = false;
        const input = item.querySelector('.todo__text');
        input?.removeAttribute('readonly');
        item.removeAttribute('draggable');
        item.classList.remove('selected');
        flushSave();
    }

    function touchReorder(touch) {
        const elemUnder = document.elementFromPoint(touch.clientX, touch.clientY);
        const target = elemUnder?.closest('.todo__input');
        const selected = document.querySelector('.selected');
        if (!target || !selected || target === selected) return;
        if (target.contains(selected)) return;

        const bounding = target.getBoundingClientRect();
        const midpoint = bounding.top + bounding.height / 2;
        const diff = touch.clientY - midpoint;

        if (diff < 0) {
            elements.todosList.insertBefore(selected, target);
        } else {
            const next = target.nextElementSibling;
            if (next === selected) return;
            if (next) elements.todosList.insertBefore(selected, next);
            else elements.todosList.appendChild(selected);
        }

        scheduleSave();
    }

    elements.todosList.addEventListener('touchstart', (event) => {
        if (!event.touches || event.touches.length !== 1) return;
        const touch = event.touches[0];

        event.preventDefault();

        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchItem = event.target.closest('.todo__input');
        if (!touchItem) return;

        document.querySelectorAll(".todo__input").forEach((it) => {
            it.style.border = '1px solid transparent';
            it.style.borderBottom = '1px solid #666666';
        });
        touchItem.style.border = '1px dashed #83aaf8ff';

        clearTouchHold();
        touchHoldTimer = setTimeout(() => {
            startTouchDrag(touchItem);
        }, TOUCH_HOLD);
    }, {passive: false});

    elements.todosList.addEventListener('touchmove', (event) => {
        if (!event.touches || event.touches.length !== 1) return;
        const touch = event.touches[0];
        const dx = Math.abs(touch.clientX - touchStartX);
        const dy = Math.abs(touch.clientY - touchStartY);

        if (!draggingTouch && (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD)) {
            clearTouchHold();
        }

        if (!draggingTouch) return;

        event.preventDefault();
        touchReorder(touch);
    }, {passive: false});

    elements.todosList.addEventListener('touchend', (event) => {
        if (touchHoldTimer) {
            clearTouchHold();
            if (touchItem) {
                const input = touchItem.querySelector('.todo__text');
                input?.focus();
            }
            touchItem = null;
            return;
        }

        if (draggingTouch && touchItem) {
            endTouchDrag(touchItem);
        }

        touchItem = null;
    });

    elements.todosList.addEventListener('touchcancel', (event) => {
        clearTouchHold();
        if (draggingTouch && touchItem) endTouchDrag(touchItem);
        touchItem = null;
    });

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