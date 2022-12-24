// 1. НАХОДИМ ЭЛЕМЕНТЫ НА СТРАНИЦЕ/ ОБЪЯВЛЯЕМ ПЕРЕМЕННЫЕ
const form = document.querySelector('#form'); // через # выбираем элементы по id 
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// 2. ВЕШАЕМ ПРОСЛУШКУ НА ФОРМУ:
form.addEventListener('submit', addTask); // добавление задачи
tasksList.addEventListener('click', deleteTask); // удаление задачи
tasksList.addEventListener('click', doneTask); // отмечаем задачу завершенной

// 3. ФУНКЦИИ:
// 3.1. добавление задачи
function addTask (event) { 
    event.preventDefault() // отменяем отправку формы
    const taskText = taskInput.value // достаем текст задачи из поля ввода
    
    // формируем разметку для новой задачи
    const taskHTML = `
                    <li class="list-group-item d-flex justify-content-between task-item">
                        <span class="task-title">${taskText}</span>
                            <div class="task-item__buttons">
                                <button type="button" data-action="done" class="btn-action">
                                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                </button>
                                <button type="button" data-action="delete" class="btn-action">
                                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                    </li>`;

     tasksList.insertAdjacentHTML('beforeend', taskHTML ); // добавляем задачу на страницу 

     taskInput.value = "" // очищаем поле ввода 
     taskInput.focus() // возвращаем на поле ввода фокус 

     // проверка. если в списке задач > 1 элемента, скрываем убираем блок 
    if (tasksList.children.length > 1) { 
         emptyList.classList.add('none'); // класс none прописан в css 
    }
}

// 3.2 удаление задачи
function deleteTask(event) {
    // проверяем если  клик был НЕ по кнопке "удалить задачу" функция  прекращает работу (return) и работает код ниже
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item'); // удаляем родительский тег li вложенный в этой кнопке
    parentNode.remove()  // удаляем родительскую ноду - задача исчезнет

    // проверка. если в списке задач 1 элемент, показываем блок
    if (tasksList.children.length === 1) { 
        emptyList.classList.remove('none');
    }
} 

// 3.3 отметка задачи выполненной doneTask
function doneTask(event) {
    // проверяем что клик был НЕ по кнопке "задача выполнена": 
    if (event.target.dataset.action !== 'done') return;
        
        const parentNode = event.target.closest('.list-group-item'); // поднимаемся до родительского тега li , от него найдем тег span с нужным классом task-title и добавим к нему нужный класс task-title--done
        const taskTitle = parentNode.querySelector('.task-title'); // нашли нужный span в котором содержится название задачи
        taskTitle.classList.toggle('task-title--done'); // методом toggle добавляем к спану нужный класс task-title--done (добавляется зачеркивание и убирается нажатием на кнопку V)
}

