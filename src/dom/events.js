import {elements} from '../dom/elements.js';
import { showTodosAndChangeTheme, changeTheme } from '../utils/theme.js';
import { sort, clearCompleted, active } from '../components/todoSort.js';
import { addMarkAndDecorateText, addTodo, addTodoWithEnter } from '../components/todoCreate.js';
import { removeTodo } from '../components/todoRemove.js';
import { handleMediaMobile, handleMediaTablet } from '../utils/media.js';
import {changeTextInStorage} from '../utils/storage.js';

export function attachEvents() {
    elements.mediaQueryMobile.addEventListener('change', handleMediaMobile);
    elements.mediaQueryTablet.addEventListener('change', handleMediaTablet);
    elements.todoAddMark.addEventListener('click', addTodo);
    elements.sortAllBtn.addEventListener('click', sort);
    elements.sortActiveBtn.addEventListener('click', sort);
    elements.sortCompletedBtn.addEventListener('click', sort);
    elements.sortCompletedClear.addEventListener('click', clearCompleted);
    elements.sortParams.forEach(param => param.addEventListener('click', active));
    document.addEventListener('DOMContentLoaded', showTodosAndChangeTheme);
    elements.changeThemeBtn.addEventListener('click', changeTheme);
    elements.todoAddText.addEventListener('keydown', addTodoWithEnter);
    elements.todosList.addEventListener('click', (event) => {
      if (event.target.classList.contains('todo__mark')) {
        addMarkAndDecorateText(event.target);
      } else if (event.target.classList.contains('todo__text')) {
        event.target.addEventListener('input', changeTextInStorage);
      } else if (event.target.classList.contains('todo__cross')) {
        removeTodo(event.target);
      }
    });
}