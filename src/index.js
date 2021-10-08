/* eslint-disable import/no-cycle */
import checkTodos from './checked.js';
import './style.css';

const displayTodos = document.querySelector('.todo-list-inner');
const todoInput = document.querySelector('.add-todo');
const todoForm = document.querySelector('.todo');
const editCancel = document.querySelector('.edit-cancel');

const clear = document.querySelector('.clear-completed');
let editId = null;
let todos = [];

function saveLocalTodos({ description, completed = false }) {
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push({ description, completed });
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  let display = '';
  todos.forEach((todo, index) => {
    const check = todo.completed ? 'checked' : '';
    const completed = todo.completed ? 'completed' : '';
    display += `
    <div class="d-flex ${completed}" id="${index}">
    <input type="checkbox" id="${index}"  class='checkbox' ${check}>
     <label for="${index}" class='label'>${todo.description}</label>
     <i class="fa fa-trash delete"></i><i class="fas fa-edit icon"></i>
    </div>
    `;
  });
  displayTodos.innerHTML = display;
}

export const editLocal = (todo) => {
  editId = todo;
  editCancel.classList.add('show');
  const me = todos[todo];
  todoInput.value = me.description;
  todoInput.focus();
};
const saveEdit = (todo) => {
  const me = todos[todo];
  me.description = todoInput.value;
  localStorage.setItem('todos', JSON.stringify(todos));
};

function addTodo(event) {
  event.preventDefault();
  if (editId != null) {
    saveEdit(editId);
    editId = null;
    editCancel.classList.remove('show');
  } else {
    saveLocalTodos({ description: todoInput.value, completed: false });
  }
  getTodos();
  todoInput.value = '';
}

export default function removeLocalTodos(todo) {
  todos.splice(todo, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

export function completeLocalTodos(todo) {
  const me = todo.parentElement;
  const answ = todos[me.id];
  if (me.classList.contains('completed')) {
    answ.completed = true;
  } else {
    answ.completed = false;
  }

  localStorage.setItem('todos', JSON.stringify(todos));
}

const clearCompletedTodo = () => {
  todos = todos.filter((item) => !item.completed === true);
  localStorage.setItem('todos', JSON.stringify(todos));
  getTodos();
};

todoForm.addEventListener('submit', addTodo);
editCancel.addEventListener('submit', () => {
  editId = null;
});

displayTodos.addEventListener('click', checkTodos);

clear.addEventListener('click', clearCompletedTodo);
document.addEventListener('DOMContentLoaded', getTodos);
