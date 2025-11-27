import {elements} from '../dom/elements.js'; 
import {addAnimation} from '../utils/animations.js';
import { updateTodoSmth, resetParamBtns } from './todoUpdate.js';
import {removeSmthField} from './todoSmth.js';
import {todoCount} from '../components/todoCount.js';
import { sort } from '../components/todoSort.js';

export function addTodoWithEnter(event) {
    if (event.key === "Enter" || 
        event.keyCode === 13 || 
        elements.mediaQueryMobile.matches && event.keyCode === 9
    ) {
        event.preventDefault();
        
        const input = this;
        addTodo(input.value, 'activeTodo');
        console.log(elements.mediaQueryMobile.matches, event.keyCode);
        input.value = "";

        input.blur();
        setTimeout(() => input.blur(), 80);
    }
}

export function addTodo(text, className, id = null, isUpdate = true) {
    id =  Number(id) || Date.now();
    const todoText = document.querySelector('.todo__add_text');

    document.activeElement?.blur();
    
    // If user adds todo in a sort field -> Btn All (active) and sort all to see all todos
    if (!elements.sortAllBtn.classList.contains('activeBtn') && isUpdate) {
        if (!todoText.value) {
            todoText.setAttribute('placeholder', 'This field can`t be empty!');
            return;
        }
        
        const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
        localStorage.setItem('todoList', JSON.stringify([...todoListStorage, [todoText.value, 'activeTodo', id]]));
        localStorage.setItem('activeSortBtn', JSON.stringify('sort__param--all'));

        resetParamBtns();
        sort.call(elements.sortAllBtn);

        todoText.value = '';
        addAnimation(elements.todoAddMark);
        return;
    }

    
    if (!todoText.value && isUpdate) {
        todoText.setAttribute('placeholder', 'This field can`t be empty!');
        return;
    }

    removeSmthField();

    todoText.setAttribute('placeholder', 'Create a new todo...');

    const newTodo = document.createElement('li');
    newTodo.classList.add('todo__input');
    newTodo.classList.add('activeTodo');
    newTodo.classList.add('fadeIn');
    newTodo.setAttribute('data-id', id);
    if (elements.mediaQueryMobile.matches) {
        newTodo.innerHTML = `
            <div class="todo__mark"></div>
            <input type="text" placeholder="Change your todo..." class="todo__text">
            <button class="todo__cross"></button>
        `
    } else {
        newTodo.innerHTML = `
            <div class="todo__mark"></div>
            <input type="text" placeholder="Change your todo..." class="todo__text">
        `
    }
    
    // Change Theme
    if (localStorage.getItem('theme') === 'light') {
        newTodo.classList.add('todo__input--light');
        newTodo.children[0].classList.add('todo__mark--light');
        newTodo.children[1].classList.add('todo__text--light');
    }

    const newTodoText = newTodo.querySelector('.todo__text');


    newTodoText.value = typeof text === 'object' ? todoText.value : String(text).replace(/[<>]/g, '');
    if (className === 'completedTodo') {
        newTodo.classList.add('completedTodo');
        newTodo.classList.remove('activeTodo');
        newTodo.children[0].classList.add('toggle__mark--checked');
        newTodo.children[1].classList.add('toggle__mark--cross');
    }

    elements.todosList.append(newTodo);
    
    updateTodoSmth('todo__input', 'todo__mark', 'todo__text');
    todoCount();

    newTodo.scrollIntoView({block : "end"});

    // Save to local storage and animation if not update information
    if (isUpdate) {
        const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
        localStorage.setItem('todoList', JSON.stringify([...todoListStorage, [todoText.value, newTodo.classList.contains('activeTodo') ? 'activeTodo' : 'completedTodo', id]]));
        
        todoText.value = '';
        addAnimation(elements.todoAddMark);
    
        todoText.blur();
        setTimeout(() => todoText.blur(), 120);
    }
}


export function addMarkAndDecorateText(mark) {
    mark.parentNode.classList.toggle('activeTodo');
    mark.classList.toggle('toggle__mark--checked');
    mark.nextElementSibling.classList.toggle('toggle__mark--cross');
    mark.parentNode.classList.toggle('completedTodo');

    // Change todo class
    const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
    const newTodoListStorage = todoListStorage.map(([_, className, id]) => {
        if (Number(id) === Number(mark.parentNode.getAttribute('data-id'))) {
            className = mark.parentNode.classList.contains('activeTodo') ? 'activeTodo' : 'completedTodo';
        }
        return [_, className, id];
    });
    localStorage.setItem('todoList', JSON.stringify(newTodoListStorage));
}