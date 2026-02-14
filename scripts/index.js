// Элементы DOM
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');
const listElement = document.querySelector('.to-do__list');
const template = document.querySelector('#to-do__item-template');

// 1. Загрузка задач
function loadTasks() {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
}

// 2. Сохранение задач
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 3. Получение задач из DOM
function getTasksFromDOM() {
    const items = document.querySelectorAll('.to-do__item-text');
    const tasks = [];
    items.forEach(item => tasks.push(item.textContent));
    return tasks;
}

// 4. Создание элемента задачи
function createItem(taskText) {
    const clone = template.content.cloneNode(true);
    const textElement = clone.querySelector('.to-do__item-text');
    const deleteButton = clone.querySelector('.to-do__item-button_type_delete');
    const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
    const editButton = clone.querySelector('.to-do__item-button_type_edit');
    
    textElement.textContent = taskText;
    
    // Удаление
    deleteButton.addEventListener('click', () => {
        clone.querySelector('.to-do__item').remove();
        saveTasks(getTasksFromDOM());
    });
    
    // Копирование
    duplicateButton.addEventListener('click', () => {
        const newItem = createItem(taskText);
        listElement.prepend(newItem);
        saveTasks(getTasksFromDOM());
    });
    
    // Редактирование
    editButton.addEventListener('click', () => {
        textElement.contentEditable = true;
        textElement.focus();
    });
    
    textElement.addEventListener('blur', () => {
        textElement.contentEditable = false;
        saveTasks(getTasksFromDOM());
    });
    
    return clone;
}

// Инициализация
const tasks = loadTasks();
tasks.forEach(task => {
    listElement.append(createItem(task));
});

// Добавление новой задачи
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = inputElement.value.trim();
    
    if (taskText) {
        listElement.prepend(createItem(taskText));
        inputElement.value = '';
        saveTasks(getTasksFromDOM());
    }
});
