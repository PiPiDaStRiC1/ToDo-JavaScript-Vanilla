export const elements = {
  main: document.querySelector('.main'),
  todoWrapper: document.querySelector('.todo'),
  sortParamsWrapper: document.querySelector('.todos__sort_params'),
  sortParams: document.querySelectorAll('.todos__sort_params_param'),
  todosList: document.querySelector('.todos__list'),
  todosSort: document.querySelector('.todos__sort'),
  changeThemeBtn: document.querySelector('.todo__header_btn'),
  todoAdd: document.querySelector('.todo__add'),
  todoAddMark: document.querySelector('.todo__mark--add'),
  todoAddText: document.querySelector('.todo__add_text'),
  sortAllBtn: document.querySelector('.sort__param--all'),
  sortActiveBtn: document.querySelector('.sort__param--active'),
  sortCompletedBtn: document.querySelector('.sort__param--completed'),
  sortCompletedClear: document.querySelector('.todos__sort_clear'),
  footerText: document.querySelector('.todo__footer_text'),
  mediaQueryMobile: window.matchMedia('(max-width: 468px)'),
  mediaQueryTablet: window.matchMedia('(max-width: 768px)')
};