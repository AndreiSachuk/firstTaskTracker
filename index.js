const addTaskBtn = document.querySelector('#addTaskButton')
const titleNewTask = document.querySelector('#inputTitle')
const textNewTask = document.querySelector('#inputText')
const currentTasks = document.querySelector('#currentTasks')
const completedTasks = document.querySelector('#completedTasks')
const completedTasksLog = document.querySelector('#completedTasksLog')
const completeTaskBtn = document.querySelector('.btn-success')
const deleteTaskBtn = document.querySelector('.btn-danger')

const editTitle = document.querySelector('#editTitle')
const editText = document.querySelector('#editText')
const editTaskBtn = document.querySelector('#editTaskButton')
const sort1 = document.querySelector('#sort1')
const sort2 = document.querySelector('#sort2')
const toDo = document.querySelector('#todo')

const background = document.querySelector('#background')



let bgTaskColor = () => {
    if (document.querySelector('#Red').checked || document.querySelector('#Red1').checked) {
        return 'bg-danger text-white';
    }
    else if (document.querySelector('#Green').checked || document.querySelector('#Green1').checked) {
        return 'bg-success text-white';
    }
    else if (document.querySelector('#Blue').checked || document.querySelector('#Blue1').checked) {
        return 'bg-primary text-white';
    }
    else if (document.querySelector('#Stand').checked || document.querySelector('#Stand1').checked) {
        return 'bg-white text-dark';
    } else
        return 'bg-white text-dark';
}


let bgColor = () => {
    if (document.querySelector('#bgWhite').checked ) {
        background.className = 'container-fluid wrapper bg-white';
        return ;
    }
    else if (document.querySelector('#bgSea').checked) {
        background.className = 'container-fluid wrapper bg-info';
        return ;
    }
    else if (document.querySelector('#bgGray').checked ) {
        background.className = 'container-fluid wrapper bg-secondary';
    }
     else
     background.className = 'container-fluid wrapper bg-white';
}

const bgSea  = document.querySelector('#bgSea').onclick = bgColor;
const bgGray  = document.querySelector('#bgGray').onclick = bgColor;
const bgWhite  = document.querySelector('#bgWhite').onclick = bgColor;




let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(titleTask, descriprion, color) {
    this.name = titleTask;
    this.descriprion = descriprion;
    this.completed = false;
    let formatter = new Intl.DateTimeFormat("en-EN", {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: "long",
        year: "numeric",
    });
    this.date = new Date();
    this.dateFormatted = formatter.format(this.date);
    this.bgColor = color;
}

const createTemplate = (task, index) => {
    return `
    <li class="list-group-item d-flex w-100 mb-2 ${task.bgColor}">
        <div class="w-100 mr-2">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${task.name}</h5>
                <div>
                    <small>Create date: ${task.dateFormatted}</small>
                </div>

            </div>
            <p class="mb-1 w-100">${task.descriprion}</p>
        </div>
        <div class="dropdown m-2 dropleft">
            <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
            </button>
            <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                <button onclick="completeTask(${index})" type="button" class="btn btn-success w-100">Complete</button>
                <button data-toggle="modal" data-target="#exampleModal1" type="button" onclick="editTask(${index})"  class="btn btn-info w-100 my-2">Edit</button>
                <button onclick="deleteTask(${index})" type="button" class="btn btn-danger w-100">Delete</button>
            </div>
        </div>
    </li>`
}


const createTemplateDone = (task, index) => {
    return `
    <li class="list-group-item d-flex w-100 mb-2 ${task.bgColor}">
        <div class="w-100 mr-2">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${task.name}</h5>
                <div>
                    <small>${task.dateFormatted}</small>
                </div>

            </div>
            <p class="mb-1 w-100">${task.descriprion}</p>
        </div>
        <div class="dropdown m-2 dropleft">
            <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
            </button>
            <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                <button onclick="completeTask(${index})" class="btn btn-info w-100 my-2">Return to ToDo</button>
                <button onclick="deleteTask(${index})" type="button" class="btn btn-danger w-100">Delete</button>
            </div>
        </div>
    </li>`
}

function fillHtmlList()  {
    currentTasks.innerHTML = '';
    completedTasks.innerHTML = '';
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            if (tasks[index].completed)
                completedTasks.innerHTML += createTemplateDone(item, index);
            else
                currentTasks.innerHTML += createTemplate(item, index);
        })
    }
    toDo.innerHTML = `ToDo(${((document.getElementById('currentTasks').childNodes.length)/2)})`;
    completedTasksLog.innerHTML = `Comleted(${((document.getElementById('completedTasks').childNodes.length)/2)})`;
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateLocal();
    fillHtmlList();
}

const editTask = (index) => {

    editTitle.value = tasks[index].name;
    editText.value = tasks[index].descriprion;

    editData = () => {
        tasks[index].name = editTitle.value;
        tasks[index].descriprion = editText.value;
        tasks[index].bgColor = bgTaskColor();
        updateLocal();
        fillHtmlList();
    };
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(titleNewTask.value, textNewTask.value, bgTaskColor()));
    updateLocal();
    fillHtmlList();
});

sort1.addEventListener('click', () => {
    tasks.sort((a, b) => a.date > b.date ? 1 : -1);
    updateLocal();
    fillHtmlList();
});

sort2.addEventListener('click', () => {
    tasks.sort((a, b) => a.date < b.date ? 1 : -1);
    updateLocal();
    fillHtmlList();
});





