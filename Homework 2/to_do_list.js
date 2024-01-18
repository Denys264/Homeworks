let todos = [];

const addButton = document.getElementById('addButton');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

addButton.addEventListener('click', () => {
 if (todoInput.value.trim() !== '') {
    todos.push({
      id: Date.now(),
      task: todoInput.value.trim(),
      completed: false
    });

    updateLocalStorage();
    renderTodos();

    todoInput.value = '';
 }
});

function renderTodos() {
 todoList.innerHTML = '';

 todos.forEach((todo) => {
    const listItem = document.createElement('li');
    listItem.textContent = todo.task;
    listItem.id = todo.id;

    if (todo.completed) {
      listItem.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      todo.completed = !todo.completed;
      updateLocalStorage();
      renderTodos();
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const newTask = prompt('Enter the new task:');

      if (newTask) {
        todo.task = newTask;
        updateLocalStorage();
        renderTodos();
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      const index = todos.findIndex((item) => item.id === todo.id);
      todos.splice(index, 1);
      updateLocalStorage();
      renderTodos();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
 });
}

function updateLocalStorage() {
 localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
 const storedTodos = localStorage.getItem('todos');

 if (storedTodos) {
    todos = JSON.parse(storedTodos);
 }
}

loadTodos();
renderTodos();