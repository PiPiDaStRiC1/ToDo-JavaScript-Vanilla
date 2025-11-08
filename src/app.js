const main = document.querySelector('.main');
const todoWrapper = document.querySelector('.todo');
const sortParamsWrapper = document.querySelector('.todos__sort_params');
const sortParams = document.querySelectorAll('.todos__sort_params_param');
const todosList = document.querySelector('.todos__list');
const todosSort = document.querySelector('.todos__sort');
const changeThemeBtn = document.querySelector('.todo__header_btn');
const todoAdd = document.querySelector('.todo__add');
const todoAddMark = document.querySelector('.todo__mark--add');
const todoAddText = document.querySelector('.todo__add_text');
const sortAllBtn = document.querySelector('.sort__param--all');
const sortActiveBtn = document.querySelector('.sort__param--active');
const sortCompletedBtn = document.querySelector('.sort__param--completed');
const sortCompletedClear = document.querySelector('.todos__sort_clear');
let todoInputs = document.querySelectorAll('.todo__input');
const mediaQueryMobile = window.matchMedia('(min-width: 0px) and (max-width: 468px)');
const mediaQueryTablet = window.matchMedia('(min-width: 0px) and (max-width: 768px)');


mediaQueryMobile.addEventListener('change', handleMediaMobile);
mediaQueryTablet.addEventListener('change', handleMediaTablet);
todoAddMark.addEventListener('click', addTodo);
sortAllBtn.addEventListener('click', sortAll);
sortActiveBtn.addEventListener('click', sortActive);
sortCompletedBtn.addEventListener('click', sortCompleted);
sortCompletedClear.addEventListener('click', clearCompleted);
sortParams.forEach(param => param.addEventListener('click', active));
document.addEventListener('DOMContentLoaded', showTodosAndChangeTheme);
changeThemeBtn.addEventListener('click', changeTheme);
todoAddText.addEventListener('keydown', addTodoWithEnter);


mediaQueryMobile.matches ? handleMediaMobile(mediaQueryMobile) : null; // mobile design update at once
mediaQueryTablet.matches ? handleMediaTablet(mediaQueryTablet) : null; // tablet design update at once


function handleMediaTablet(media) {
    if (media.matches && localStorage.getItem('theme') === 'light') {
        main.classList.add('main--tablet--light');
        main.classList.remove('main--tablet');
    } else if (media.matches && localStorage.getItem('theme') === 'dark') {
        main.classList.add('main--tablet');
        main.classList.remove('main--tablet--light');
    } else if (!media.matches && localStorage.getItem('theme') === 'light') {
        main.classList.remove('main--tablet');
        main.classList.remove('main--tablet--light');
        main.classList.add('main--light');
    } else {
        main.classList.remove('main--tablet');
        main.classList.remove('main--tablet--light');
        main.classList.remove('main--light');
    }
}

function handleMediaMobile(media) {
    if (media.matches) {
        sortParamsWrapper.classList.add('todo__params');
        todoWrapper.append(sortParamsWrapper);
        appendAllCross();
    } else {
        sortParamsWrapper.classList.remove('todo__params');
        todosSort.insertBefore(sortParamsWrapper, sortCompletedClear);
        removeAllCross();
    }
};

function changeTheme(event, isClicked = true) {
    if (isClicked) {

        changeThemeBtn.classList.toggle('todo__header_btn--light');

        // Save Theme to local Storage
        if (changeThemeBtn.classList.contains('todo__header_btn--light')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }
    

    if (localStorage.getItem('theme') === 'light') {
        changeThemeBtn.classList.add('todo__header_btn--light');
        if (mediaQueryTablet.matches) {
            main.classList.add('main--tablet');
            main.classList.add('main--tablet--light');
        } else {
            main.classList.remove('main--tablet');
            main.classList.add('main--light');
        }
        todosList.classList.add('todos__list--light');
        todosSort.classList.add('todos__sort--light');
        sortParamsWrapper.classList.add('todos__sort_params--light');
        todoAdd.classList.add('todo__add--light');
        todoAddText.classList.add('todo__add_text--light');
        todoAddMark.classList.add('todo__mark--add--light');
        document.querySelector('.todo__smth') ? document.querySelector('.todo__smth').classList.add('todo__smth--light') : null;
        todoInputs.forEach(todoInput => {
            todoInput.classList.add('todo__input--light');
        });
        document.querySelectorAll('.todo__mark').forEach(_ => {
            _.classList.add('todo__mark--light');
        });
        document.querySelectorAll('.todo__text').forEach(_ => {
            _.classList.add('todo__text--light');
        });
    } else {
        changeThemeBtn.classList.remove('todo__header_btn--light');
        if (mediaQueryTablet.matches) {
            main.classList.add('main--tablet');
            main.classList.remove('main--tablet--light');
        } else {
            main.classList.remove('main--tablet');
            main.classList.remove('main--light');
        }
        todosList.classList.remove('todos__list--light');
        todosSort.classList.remove('todos__sort--light');
        sortParamsWrapper.classList.remove('todos__sort_params--light');
        todoAdd.classList.remove('todo__add--light');
        todoAddText.classList.remove('todo__add_text--light');
        todoAddMark.classList.remove('todo__mark--add--light');
        document.querySelector('.todo__smth') ? document.querySelector('.todo__smth').classList.remove('todo__smth--light') : null;
        todoInputs.forEach(todoInput => {
            todoInput.classList.remove('todo__input--light');
        });
        document.querySelectorAll('.todo__mark').forEach(_ => {
            _.classList.remove('todo__mark--light');
        });
        document.querySelectorAll('.todo__text').forEach(_ => {
            _.classList.remove('todo__text--light');
        });
    }
}



function showTodosAndChangeTheme() {
    changeTheme(event, false);


    const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];

    storageTodosList.forEach(([text, className, id]) => {
        addTodo(text, className, id, false);
        updateTodoInputs();
        todoCount();
    });

    if (JSON.parse(localStorage.getItem('activeSortBtn')) === "sort__param--active") {
        sortParams.forEach(param => {
            param.classList.remove('activeBtn');
        });
        sortActiveBtn.classList.add('activeBtn');
        sortActive();
    } else if (JSON.parse(localStorage.getItem('activeSortBtn')) === "sort__param--completed") {
        sortParams.forEach(param => {
            param.classList.remove('activeBtn');
        });
        sortCompletedBtn.classList.add('activeBtn');
        sortCompleted();
    }
}

function addTodoWithEnter(event) {
    if (event.key === 'Enter') {
        addTodo(this.value, 'activeTodo');
    }
}

function addTodo(text, className, id = null, isUpdate = true) {

    // If user adds todo in a sort field -> Btn All (active) and sort all to see all todos
    if (!sortAllBtn.classList.contains('activeBtn')) {
        resetParamBtns();
        sortAll();
    }

    
    id =  Number(id) || Date.now();
    const todoText = document.querySelector('.todo__add_text');
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
    if (mediaQueryMobile.matches) {
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


    newTodoText.value = typeof text === 'object' ? todoText.value : text;
    if (className === 'completedTodo') {
        newTodo.classList.add('completedTodo');
        newTodo.classList.remove('activeTodo');
        newTodo.children[0].classList.add('toggle__mark--checked');
        newTodo.children[1].classList.add('toggle__mark--cross');
    }

    todosList.append(newTodo);
    

    updateTodoInputs();
    todoCount();
    appendAllCross();

    // Save to local storage and animation if not update information
    if (isUpdate) {
        const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
        localStorage.setItem('todoList', JSON.stringify([...todoListStorage, [todoText.value, newTodo.classList.contains('activeTodo') ? 'activeTodo' : 'completedTodo', id]]));

        todoAddMark.classList.add('toggle__mark--checked');
        todoAddMark.classList.add('scale-out-center');
        todoText.value = '';
        setTimeout(() => {
            todoAddMark.classList.remove('scale-out-center');
            todoAddMark.classList.add('scale-up-center');
            todoAddMark.classList.remove('toggle__mark--checked');
        }, 480)
        setTimeout(() => todoAddMark.classList.remove('scale-up-center'), 1000);
    }
    
}

function addMarkAndDecorateText () {
    this.parentNode.classList.toggle('activeTodo');
    this.classList.toggle('toggle__mark--checked');
    this.nextElementSibling.classList.toggle('toggle__mark--cross');
    this.parentNode.classList.toggle('completedTodo');

    // Change todo class
    const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
    const newTodoListStorage = todoListStorage.map(([_, className, id]) => {
        if (Number(id) === Number(this.parentNode.getAttribute('data-id'))) {
            className = this.parentNode.classList.contains('activeTodo') ? 'activeTodo' : 'completedTodo';
        }
        return [_, className, id];
    });
    localStorage.setItem('todoList', JSON.stringify([...newTodoListStorage]));
}

function changeTextInStorage() {
    const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
    const newTodoListStorage = todoListStorage.map(([text, className, id]) => {
        if (Number(this.parentNode.getAttribute('data-id')) === Number(id)) {
            return [this.value, className, id];
        }
        return [text, className, id];
    });
    localStorage.setItem('todoList', JSON.stringify([...newTodoListStorage]));
}

function active() {
    sortParams.forEach(param => {
        param.classList.remove('activeBtn');
    })
    this.classList.add('activeBtn');
    localStorage.setItem('activeSortBtn', JSON.stringify(this.classList[1]));
}

function todoCount() {
    let itemCount = 0;
    const todoCounts = document.querySelector('.todos__sort_left');
    todoInputs.forEach(_ => itemCount++);
    todoCounts.innerText = `${itemCount} items left`;
}

function updateTodoInputs() {
    todoInputs = document.querySelectorAll('.todo__input') || [];
    document.querySelectorAll('.todo__mark').forEach(mark => mark.addEventListener('click', addMarkAndDecorateText));
    document.querySelectorAll('.todo__text').forEach(text => text.addEventListener('change', changeTextInStorage));
}

function removeSmthField() {
    const smth = document.querySelector('.todo__smth');
    smth ? smth.remove() : null;
}

function createSmthField(inText, inputCount) {
    const smth = document.createElement('li');
    if (inputCount === 0) {
        smth.classList.add('todo__smth');
        smth.classList.add('fadeIn');
        smth.innerText = inText;
        todosList.append(smth);

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

function resetParamBtns() {
    sortParams.forEach(param => {
        param.classList.remove('activeBtn');
    });
    document.querySelector('.sort__param--all').classList.add('activeBtn'); 
}

function appendAllCross() {
    if (mediaQueryMobile.matches) {
        todoInputs.forEach(todoInput => {
            const cross = document.createElement('button');
            cross.classList.add('todo__cross');
            cross.addEventListener('click', removeTodo);
            todoInput.append(cross);
        });
    }
}

function removeAllCross() {
    document.querySelectorAll('.todo__cross').forEach(cross => {
        cross.removeEventListener('click', removeTodo);
        cross.remove();
    });
}

function removeTodo() {
    const todoId = this.parentNode.getAttribute('data-id');
    this.parentNode.classList.add('fadeOut');
    setTimeout(() => {
        this.parentNode.classList.remove('fadeOut');
        // Delete node from localStorage
        const storageTodoList = JSON.parse(localStorage.getItem('todoList')) || [];
        const newStorageTodoList = storageTodoList.filter(([_, className, id]) => {
            if (Number(todoId) !== Number(id)) return [_, className, id];
        });
        localStorage.setItem('todoList', JSON.stringify([...newStorageTodoList]));
    
        const removeTodoIndex = [...todoInputs].findIndex(todoInput => Number(todoInput.getAttribute('data-id')) === Number(todoId));
        todoInputs[removeTodoIndex].remove(); // delete node from DOM
        todoInputs = [...todoInputs].filter((_, index) => index !== removeTodoIndex); // delete node from todoInputs
    
        if (todosList.children.length === 0) {
            createSmthField("Add something...", 0);
        }
    
        todoCount();
    }, 480)
}

function sortAll() {
    let inputCount = 0;
    todosList.innerHTML = '';

    todoInputs.forEach(todoInput => {
        if (todoInput) {todosList.append(todoInput); inputCount++};
    });

    createSmthField("Add something...", inputCount);

    if (mediaQueryMobile.matches) {
        todosList.after(todosSort);
    } else {
        todoWrapper.append(todosSort);
    }

}

function sortActive() {
    let inputCount = 0;
    todosList.innerHTML = '';

    todoInputs.forEach(todoInput => {
        if (todoInput.classList.contains('activeTodo')) {todosList.append(todoInput); inputCount++};
    });

    createSmthField("No Active yet...", inputCount);

    if (mediaQueryMobile.matches) {
        todosList.after(todosSort);
    } else {
        todoWrapper.append(todosSort);
    }
}

function sortCompleted() {
    let inputCount = 0;
    todosList.innerHTML = '';

    todoInputs.forEach(todoInput => {
        if (todoInput.classList.contains('completedTodo')) {todosList.append(todoInput); inputCount++};
    });

    createSmthField("No Completed yet...", inputCount);

    if (mediaQueryMobile.matches) {
        todosList.after(todosSort);
    } else {
        todoWrapper.append(todosSort);
    }
}


function clearCompleted() {

    let inputCount = 0;
    if (todoInputs.length === 0) return;

    // Delete completed from local storage
    const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];
    const newStorageTodoList = storageTodosList.filter(([_, className, id]) => {
        if (className !== 'completedTodo') return [_, className, id];
    });
    localStorage.setItem('todoList', JSON.stringify([...newStorageTodoList]));

    removeSmthField();

    todoInputs.forEach(todoInput => {
        if (todoInput.classList.contains('completedTodo')) {
            todoInput.remove();
        } else {
            todosList.append(todoInput);
            inputCount++;
        }
    });
    createSmthField("Add something...", inputCount);
    if (mediaQueryMobile.matches) {
        todosList.after(todosSort);
    } else {
        todoWrapper.append(todosSort);
    }

    localStorage.setItem('activeSortBtn', JSON.stringify('sort__param--all'));
    resetParamBtns(); 
    // Reverse to All btn
    updateTodoInputs();
    todoCount();
}
