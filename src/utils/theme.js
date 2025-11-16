import {elements} from '../dom/elements.js';
import {sort} from '../components/todoSort.js';
import {updateTodoSmth} from '../components/todoUpdate.js';
import {todoCount} from '../components/todoCount.js';
import { addTodo } from '../components/todoCreate.js';

export function changeTheme(event, isClicked = true) {
    if (isClicked) {

        elements.changeThemeBtn.classList.toggle('todo__header_btn--light');

        // Save Theme to local Storage
        if (elements.changeThemeBtn.classList.contains('todo__header_btn--light')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }

    const lightSingleElements = [
        [elements.changeThemeBtn, 'todo__header_btn--light'],
        [elements.todosList, 'todos__list--light'],
        [elements.todosSort, 'todos__sort--light'],
        [elements.sortParamsWrapper, 'todos__sort_params--light'],
        [elements.todoAdd, 'todo__add--light'],
        [elements.todoAddText, 'todo__add_text--light'],
        [elements.todoAddMark, 'todo__mark--add--light'],
        [document.querySelector('.todo__smth') ? document.querySelector('.todo__smth') : null, 'todo__smth--light']
    ];
    const todoInputs = document.querySelectorAll('.todo__input');
    const todoMarks = document.querySelectorAll('.todo__mark');
    const todoTexts = document.querySelectorAll('.todo__text');
    const lightArrayElements = [
        [todoInputs, 'todo__input--light'],
        [todoMarks, 'todo__mark--light'],
        [todoTexts, 'todo__text--light']
    ];
    
    

    if (localStorage.getItem('theme') === 'light') {

        // Light Background
        if (elements.mediaQueryTablet.matches) {
            elements.main.classList.add('main--tablet', 'main--tablet--light');
        } else {
            elements.main.classList.remove('main--tablet');
            elements.main.classList.add('main--light');
        }


        lightSingleElements.forEach(([_, className]) => {
            if (_ !== null) _.classList.add(className);
        });
        lightArrayElements.forEach(([arr, className]) => {arr.forEach(_ => _.classList.add(className))});
    } else {

        // Dark Background 
        if (elements.mediaQueryTablet.matches) {
            elements.main.classList.add('main--tablet');
            elements.main.classList.remove('main--tablet--light');
        } else {
            elements.main.classList.remove('main--tablet', 'main--light');
        }


        lightSingleElements.forEach(([_, className]) => {
            if (_ !== null) _.classList.remove(className);
        });
        lightArrayElements.forEach(([arr, className]) => {arr.forEach(_ => _.classList.remove(className))});
    }
}

export function showTodosAndChangeTheme() {
    changeTheme(event, false);
    const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];

    storageTodosList.forEach(([text, className, id]) => {
        addTodo(text, className, id, false);
        updateTodoSmth('todo__input', 'todo__mark', 'todo__text');
        todoCount();
    });

    if (JSON.parse(localStorage.getItem('activeSortBtn')) === "sort__param--active") {
        elements.sortParams.forEach(param => {
            param.classList.remove('activeBtn');
        });
        elements.sortActiveBtn.classList.add('activeBtn');
        sort.call(elements.sortActiveBtn);
    } else if (JSON.parse(localStorage.getItem('activeSortBtn')) === "sort__param--completed") {
        elements.sortParams.forEach(param => {
            param.classList.remove('activeBtn');
        });
        elements.sortCompletedBtn.classList.add('activeBtn');
        sort.call(elements.sortCompletedBtn);
    }
}