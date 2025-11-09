(function initApp() {
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
    let todoMarks = document.querySelectorAll('.todo__mark');
    let todoTexts = document.querySelectorAll('.todo__text');
    const mediaQueryMobile = window.matchMedia('(min-width: 0px) and (max-width: 468px)');
    const mediaQueryTablet = window.matchMedia('(min-width: 0px) and (max-width: 768px)');
    
    
    mediaQueryMobile.addEventListener('change', handleMediaMobile);
    mediaQueryTablet.addEventListener('change', handleMediaTablet);
    todoAddMark.addEventListener('click', addTodo);
    sortAllBtn.addEventListener('click', sort);
    sortActiveBtn.addEventListener('click', sort);
    sortCompletedBtn.addEventListener('click', sort);
    sortCompletedClear.addEventListener('click', clearCompleted);
    sortParams.forEach(param => param.addEventListener('click', active));
    document.addEventListener('DOMContentLoaded', showTodosAndChangeTheme);
    changeThemeBtn.addEventListener('click', changeTheme);
    todoAddText.addEventListener('keydown', addTodoWithEnter);
    todosList.addEventListener('click', (event) => {
      if (event.target.classList.contains('todo__mark')) {
        addMarkAndDecorateText(event.target);
      } else if (event.target.classList.contains('todo__text')) {
        event.target.addEventListener('input', changeTextInStorage);
      } else if (event.target.classList.contains('todo__cross')) {
        removeTodo(event.target);
      }
    });
    
    
    mediaQueryMobile.matches ? handleMediaMobile(mediaQueryMobile) : null; // mobile design update at once
    mediaQueryTablet.matches ? handleMediaTablet(mediaQueryTablet) : null; // tablet design update at once
    
    
    function handleMediaTablet(media) {
        const theme = localStorage.getItem('theme');

        switch (true) {
            case media.matches && theme === 'light':
                main.classList.add('main--tablet--light');
                main.classList.remove('main--tablet');
                break;

            case media.matches && theme === 'dark':
                main.classList.add('main--tablet');
                main.classList.remove('main--tablet--light');
                break;

            case !media.matches && theme === 'light':
                main.classList.remove('main--tablet', 'main--tablet--light');
                main.classList.add('main--light');
                break;

            default:
                main.classList.remove('main--tablet', 'main--tablet--light', 'main--light');
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

        const lightSingleElements = [
            [changeThemeBtn, 'todo__header_btn--light'],
            [todosList, 'todos__list--light'],
            [todosSort, 'todos__sort--light'],
            [sortParamsWrapper, 'todos__sort_params--light'],
            [todoAdd, 'todo__add--light'],
            [todoAddText, 'todo__add_text--light'],
            [todoAddMark, 'todo__mark--add--light'],
            [document.querySelector('.todo__smth') ? document.querySelector('.todo__smth') : null, 'todo__smth--light']
        ];
        const lightArrayElements = [
            [todoInputs, 'todo__input--light'],
            [todoMarks, 'todo__mark--light'],
            [todoTexts, 'todo__text--light']
        ];
        
    
        if (localStorage.getItem('theme') === 'light') {

            // Light Background
            if (mediaQueryTablet.matches) {
                main.classList.add('main--tablet', 'main--tablet--light');
            } else {
                main.classList.remove('main--tablet');
                main.classList.add('main--light');
            }


            lightSingleElements.forEach(([_, className]) => {
                if (_ !== null) _.classList.add(className);
            });
            lightArrayElements.forEach(([arr, className]) => {arr.forEach(_ => _.classList.add(className))});
        } else {

            // Dark Background 
            if (mediaQueryTablet.matches) {
                main.classList.add('main--tablet');
                main.classList.remove('main--tablet--light');
            } else {
                main.classList.remove('main--tablet', 'main--light');
            }


            lightSingleElements.forEach(([_, className]) => {
                if (_ !== null) _.classList.remove(className);
            });
            lightArrayElements.forEach(([arr, className]) => {arr.forEach(_ => _.classList.remove(className))});
        }
    }
    
    function addAnimation(animationNode) {
        animationNode.classList.add('toggle__mark--checked');
        animationNode.classList.add('scale-out-center');
        setTimeout(() => {
            animationNode.classList.remove('scale-out-center');
            animationNode.classList.add('scale-up-center');
            animationNode.classList.remove('toggle__mark--checked');
        }, 480)
        setTimeout(() => animationNode.classList.remove('scale-up-center'), 1000);
    }
    
    
    function showTodosAndChangeTheme() {
        changeTheme(event, false);
    
        const storageTodosList = JSON.parse(localStorage.getItem('todoList')) || [];
    
        storageTodosList.forEach(([text, className, id]) => {
            addTodo(text, className, id, false);
            updateTodoSmth('todo__input', 'todo__mark', 'todo__text');
            todoCount();
        });
    
        if (JSON.parse(localStorage.getItem('activeSortBtn')) === "sort__param--active") {
            sortParams.forEach(param => {
                param.classList.remove('activeBtn');
            });
            sortActiveBtn.classList.add('activeBtn');
            sort.call(sortActiveBtn);
        } else if (JSON.parse(localStorage.getItem('activeSortBtn')) === "sort__param--completed") {
            sortParams.forEach(param => {
                param.classList.remove('activeBtn');
            });
            sortCompletedBtn.classList.add('activeBtn');
            sort.call(sortCompletedBtn);
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
            sort.call(sortAllBtn);
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
    
    
        newTodoText.value = typeof text === 'object' ? todoText.value : String(text).replace(/[<>]/g, '');
        if (className === 'completedTodo') {
            newTodo.classList.add('completedTodo');
            newTodo.classList.remove('activeTodo');
            newTodo.children[0].classList.add('toggle__mark--checked');
            newTodo.children[1].classList.add('toggle__mark--cross');
        }
    
        todosList.append(newTodo);
        
        updateTodoSmth('todo__input', 'todo__mark', 'todo__text');
        todoCount();
        appendAllCross();
    
        // Save to local storage and animation if not update information
        if (isUpdate) {
            const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
            localStorage.setItem('todoList', JSON.stringify([...todoListStorage, [todoText.value, newTodo.classList.contains('activeTodo') ? 'activeTodo' : 'completedTodo', id]]));
            
            todoText.value = '';
            addAnimation(todoAddMark);
        }
    }
    
    function addMarkAndDecorateText(mark) {
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
    
    function changeTextInStorage() {
        const todoListStorage = JSON.parse(localStorage.getItem('todoList')) || [];
        const newTodoListStorage = todoListStorage.map(([text, className, id]) => {
            if (Number(this.parentNode.getAttribute('data-id')) === Number(id)) {
                return [this.value, className, id];
            }
            return [text, className, id];
        });
        localStorage.setItem('todoList', JSON.stringify(newTodoListStorage));
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

    function updateTodoSmth(...classNames) {
        classNames.forEach(className => {
            switch(className) {
                case 'todo__input':
                    todoInputs = document.querySelectorAll(`.${className}`) || [];
                    break;
                case 'todo__mark':
                    todoMarks = document.querySelectorAll(`.${className}`) || [];
                    break;
                case 'todo__text':
                    todoTexts = document.querySelectorAll(`.${className}`) || [];
                    break;
            }
        })
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
    
    function removeTodo(cross) {
        const todoId = cross.parentNode.getAttribute('data-id');
        cross.parentNode.classList.add('fadeOut');
        setTimeout(() => {
            cross.parentNode.classList.remove('fadeOut');
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

    function sort() {
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
        todosList.innerHTML = '';

        todoInputs.forEach(todoInput => {
            if (todoInput.classList.contains(className)) {todosList.append(todoInput); inputCount++};
        });

        createSmthField(smthFieldText, inputCount);
    
        mediaQueryMobile.matches ? todosList.after(todosSort) : todoWrapper.append(todosSort);
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
        mediaQueryMobile.matches ? todosList.after(todosSort) : todoWrapper.append(todosSort);

    
        localStorage.setItem('activeSortBtn', JSON.stringify('sort__param--all'));
        resetParamBtns(); 
        // Reverse to All btn
        updateTodoSmth('todo__input', 'todo__mark', 'todo__text');
        todoCount();
    }
})();