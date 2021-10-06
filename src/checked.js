/* eslint-disable import/no-cycle */
import removeLocalTodos, { completeLocalTodos, editLocal } from './index.js';

function checkTodos(e) {
  const item = e.target;
  const todo = item.parentElement;
  // eslint-disable-next-line prefer-destructuring
  const id = todo.id;

  if (item.classList.contains('delete')) {
    todo.style.display = 'none';
    removeLocalTodos(id);
  }
  if (item.checked && !item.classList.contains('delete')) {
    todo.classList.add('completed');
    completeLocalTodos(item);
  }
  if (!item.checked && !item.classList.contains('delete')) {
    todo.classList.remove('completed');
    completeLocalTodos(item);
  }

  if (item.classList.contains('icon')) {
    item.classList.add('edited');
    editLocal(id);
  }
}

export default checkTodos;