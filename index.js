// DOM элементы
const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-form__input');
const todoList = document.querySelector('.todo-list');
const template = document.querySelector('#todo-template');

// Начальные задачи
const defaultTasks = [
    'Сделать проект To-do',
    'Изучить JavaScript',
    'Проверить код',
    'Отправить задание',
    'Отдохнуть'
];

// Загрузка из localStorage
function loadTasks() {
    const saved = localStorage.getItem('todo-tasks');
    if (saved) {
        return JSON.parse(saved);
    }
    return defaultTasks;
}

// Сохранение в localStorage
function saveTasks(tasks) {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}

// Получение всех задач из DOM
function getTasksFromDOM() {
    const tasks = [];
    document.querySelectorAll('.todo-item__text').forEach(el => {
        tasks.push(el.textContent);
    });
    return tasks;
}

// Создание элемента задачи
function createTask(text) {
    const clone = template.content.cloneNode(true);
    const item = clone.querySelector('.todo-item');
    const textEl = clone.querySelector('.todo-item__text');
    const editBtn = clone.querySelector('.todo-item__button_type_edit');
    const copyBtn = clone.querySelector('.todo-item__button_type_copy');
    const deleteBtn = clone.querySelector('.todo-item__button_type_delete');
    
    textEl.textContent = text;
    
    // Удаление
    deleteBtn.addEventListener('click', () => {
        item.remove();
        saveTasks(getTasksFromDOM());
    });
    
    // Копирование
    copyBtn.addEventListener('click', () => {
        const newTask = createTask(text);
        todoList.prepend(newTask);
        saveTasks(getTasksFromDOM());
    });
    
    // Редактирование
    editBtn.addEventListener('click', () => {
        textEl.contentEditable = true;
        textEl.focus();
    });
    
    textEl.addEventListener('blur', () => {
        textEl.contentEditable = false;
        saveTasks(getTasksFromDOM());
    });
    
    textEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            textEl.blur();
        }
    });
    
    return clone;
}

// Инициализация
function init() {
    const tasks = loadTasks();
    todoList.innerHTML = '';
    tasks.forEach(task => {
        todoList.appendChild(createTask(task));
    });
}

// Обработка формы
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    
    if (text) {
        const newTask = createTask(text);
        todoList.prepend(newTask);
        input.value = '';
        saveTasks(getTasksFromDOM());
    }
});

// Запуск
document.addEventListener('DOMContentLoaded', init);
