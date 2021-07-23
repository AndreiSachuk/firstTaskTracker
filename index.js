const addTaskBtn = document.querySelector('#addTaskButton')
const titleNewTask = document.querySelector('#inputTitle')
const textNewTask = document.querySelector('#inputText')
const currentTasks = document.querySelector('#currentTasks')
const completedTasks = document.querySelector('#completedTasks')
const completedTasksLog = document.querySelector('#completedTasksLog')
const completeTaskBtn = document.querySelector('.btn-success')
const deleteTaskBtn = document.querySelector('.btn-danger')

const sort1 = document.querySelector('#sort1')
const sort2 = document.querySelector('#sort2')
const toDo = document.querySelector('#todo')

const background = document.querySelector('#background')

const form = document.querySelector('#form')

const modalTitle = document.querySelector('#exampleModalLabel')
const editTaskBtn = document.querySelector('#editTaskButton')


const colorsList = document.querySelectorAll("[name=checkColor");
const positionList = document.querySelectorAll("[name=gridRadios")


let bgTaskColor = () => {
    if (document.querySelector('#Red').checked) {
        return 'bg-danger text-white';
    }
    else if (document.querySelector('#Green').checked) {
        return 'bg-success text-white';
    }
    else if (document.querySelector('#Blue').checked) {
        return 'bg-primary text-white';
    }
    else if (document.querySelector('#Stand').checked) {
        return 'bg-white text-dark';
    } else
        return 'bg-white text-dark';
}


let priority = () => {
    if (document.querySelector('#Low').checked) {
        return 'Low';
    }
    else if (document.querySelector('#Medium').checked) {
        return 'Medium';
    }
    else if (document.querySelector('#High').checked) {
        return 'High';
    }
}


let bgColor = () => {
    if (document.querySelector('#bgWhite').checked) {
        background.className = 'container-fluid wrapper bg-white';
        return;
    }
    else if (document.querySelector('#bgSea').checked) {
        background.className = 'container-fluid wrapper bg-info';
        return;
    }
    else if (document.querySelector('#bgGray').checked) {
        background.className = 'container-fluid wrapper bg-secondary';
    }
    else
        background.className = 'container-fluid wrapper bg-white';
}

const bgSea = document.querySelector('#bgSea').onclick = bgColor;
const bgGray = document.querySelector('#bgGray').onclick = bgColor;
const bgWhite = document.querySelector('#bgWhite').onclick = bgColor;

let tasks;
tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

function Task(titleTask, descriprion, color, priority) {
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
    this.colorPosition = colorPosition();
    this.priority = priority;
    this.priorityPosition = priorityPosition();

}

let colorPosition = () => {
    for (let index = 0; index < colorsList.length; index++) {
        if (colorsList[index].checked) {
            return index;
        }
    }
};

let priorityPosition = () => {
    for (let index = 0; index < positionList.length; index++) {
        if (positionList[index].checked) {
            return index;
        }
    }
}

const createTemplate = (task, index) => {
    return `
    <li class="list-group-item d-flex w-100 mb-2 ${task.bgColor}">
        <div class="w-100 mr-2">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${task.name}</h5>
                <div>
                    <small class="mr-2">${task.priority} priority</small>
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
                <button data-toggle="modal" data-target="#exampleModal" type="button" onclick="editTask(${index})"  class="btn btn-info w-100 my-2">Edit</button>
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
                    <small class="mr-2">${task.priority} priority</small>
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

function fillHtmlList() {
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
    toDo.innerHTML = `ToDo(${((document.getElementById('currentTasks').childNodes.length) / 2)})`;
    completedTasksLog.innerHTML = `Comleted(${((document.getElementById('completedTasks').childNodes.length) / 2)})`;
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
    modalTitle.innerHTML = "Edit task";
    addTaskBtn.className = 'd-none';
    editTaskBtn.className = 'btn btn-primary';
    titleNewTask.value = tasks[index].name;
    textNewTask.value = tasks[index].descriprion;
    form.gridRadios[tasks[index].priorityPosition].checked = true;
    form.checkColor[tasks[index].colorPosition].checked = true;
    editData = () => {
        tasks[index].name = titleNewTask.value;
        tasks[index].descriprion = textNewTask.value;
        tasks[index].bgColor = bgTaskColor();
        tasks[index].priority = priority();
        tasks[index].priorityPosition = priorityPosition();
        tasks[index].colorPosition = colorPosition();
        updateLocal();
        fillHtmlList();
    };
}


const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

form.addEventListener('submit', (event) => {
    if (event.submitter.id === "addTaskButton") {
        tasks.push(new Task(titleNewTask.value, textNewTask.value, bgTaskColor(), priority()));
        updateLocal();
        fillHtmlList();
    } else if (event.submitter.id === "editTaskButton") {
        editData();
    }
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
