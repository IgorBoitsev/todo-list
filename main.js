const descriptionTask = document.querySelector('#description-task'),
      addTaskBtn = document.querySelector('#add-task-btn'),
      todosWrapper = document.querySelector('.todos-wrapper');

// Массив с задачами
let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
  // Описание задачи
  this.description = description;
  // Статус выполнения задачи
  this.completed = false;
}

// Функция добавления задач в локальное хранилище
const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Функция создания обертки для задачи
const createTaskWrapper = (task, index) => {
  return `<div class='todo-item ${task.completed ? 'checked' : ''}' id='${index}'>
            <div class='description'>${task.description}</div>
            <div class='buttons'>
              <input class='btn-complete' type='checkbox' ${task.completed ? 'checked' : ''}>
              <button class='btn-delete'>Удалить</button>
            </div>
          </div>`;
}
// Функция создания списка задач
const fillTasksList = () => {
  // Очистка имеющихся данных
  todosWrapper.innerHTML = '';
  // Создание и заполнение списка задач
  if (tasks.length > 0) {
    taskFilter();
    tasks.forEach((item, index) => {
      todosWrapper.innerHTML += createTaskWrapper(item, index);
    });
  }
}
// Функция выполнения или удаления задачи
const completeDeleteTask = (target, index) => {
  // Выполнение задачи
  if (target.classList.contains('btn-complete')) {
    tasks[index].completed = !tasks[index].completed;
    target.closest('.todo-item').classList.toggle('checked');
    updateLocalStorage();
    fillTasksList();
  }
  // Удаление задачи
  if (target.classList.contains('btn-delete')) {
    // console.log(target);
    // console.log(target.closest('.todo-item'));
    target.closest('.todo-item').classList.add('delition');
    // console.log(target.closest('.todo-item'));
    setTimeout(() => {
      tasks.splice(index, 1);
      updateLocalStorage();
      fillTasksList();
    }, 1000);
  }
}
// Функиця фильтрации задач
const taskFilter = () => {
  // Список активных задач
  const activeTasks = tasks.length && tasks.filter(item => item.completed == false),
        completedTasks = tasks.length && tasks.filter(item => item.completed == true);

  tasks = [...activeTasks, ...completedTasks];
}

// Первоначальная проверка наличия задач и вывод их списком
fillTasksList();
// Добавление новой задачи
addTaskBtn.addEventListener('click', () => {
  // Проверка наличия текста в поле ввода
  if (descriptionTask.value !== '') {
    tasks.push(new Task(descriptionTask.value));
    // Очистка поля ввода
    descriptionTask.value = '';
    // Обновление локального хранилища
    updateLocalStorage();
    // Отрисовка списка задача
    fillTasksList();
  }
})
// Перевод задачи в разряд выполненных
todosWrapper.addEventListener('click', (event) => {
  // Получение порядкового номера задачи
  const completeTaksId = event.target.closest('.todo-item').id;
  completeDeleteTask(event.target, completeTaksId);
})