import {elements} from '../dom/elements.js';
import {createSmthField, removeSmthField} from '../components/todoSmth.js';
import {addTodo} from '../components/todoCreate.js';
import { resetParamBtns, updateTodoSmth } from './todoUpdate.js';
import {todoCount} from './todoCount.js';

export function active() {
    elements.sortParams.forEach(param => {
        param.classList.remove('activeBtn');
    })
    this.classList.add('activeBtn');
    localStorage.setItem('activeSortBtn', JSON.stringify(this.classList[1]));
}

export function sort() {
    let className = '';
    let smthFieldText = '';
    if (this.classList.contains('sort__param--all')) {
        className = 'todo__input';
        smthFieldText = 'Add something...';
    } else if (this.classList.contains('sort__param--active')) {
        className = 'activeTodo';
        smthFieldText = 'No Active yet...';
    } else {
        className = 'completedTodo';
        smthFieldText = 'No Completed yet...';
    }

    let inputCount = 0;
    elements.todosList.innerHTML = '';

    const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];
    storageTodosList.forEach(([text, todoClass, id]) => {
        if (
            className === 'todo__input' || 
            (className === 'activeTodo' && todoClass === 'activeTodo') ||
            (className === 'completedTodo' && todoClass === 'completedTodo')
        ) {
            addTodo(text, todoClass, id, false);
            inputCount++;
        }
    });

    createSmthField(smthFieldText, inputCount);

    elements.todosList.after(elements.todosSort);
}

export function clearCompleted() {
    const todoInputs = document.querySelectorAll('.todo__input');

    let inputCount = 0;
    if (todoInputs.length === 0) return;

    // Delete completed from local storage
    const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];
    const newstorageTodosList = storageTodosList.filter(([_, className, id]) => {
        if (className !== 'completedTodo') return [_, className, id];
    });
    localStorage.setItem('todoList', JSON.stringify([...newstorageTodosList]));

    removeSmthField();

    todoInputs.forEach(todoInput => {
        if (todoInput.classList.contains('completedTodo')) {
            todoInput.remove();
        } else {
            elements.todosList.append(todoInput);
            inputCount++;
        }
    });
    createSmthField("Add something...", inputCount);
    elements.todosList.after(elements.todosSort);

    localStorage.setItem('activeSortBtn', JSON.stringify('sort__param--all'));
    resetParamBtns(); 
    // Reverse to All btn
    updateTodoSmth('todo__input', 'todo__mark', 'todo__text');
    todoCount();
}