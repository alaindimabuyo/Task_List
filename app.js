// define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task')
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all Event Listeners
loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask)
    taskList.addEventListener('click', removeTask)
    clearBtn.addEventListener('click', clearTask)
    filter.addEventListener('keyup', filterTaskEvent)
}

//GET TAKS FROM LS 
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        const li = document.createElement('li')
        li.className ='collection-item'
        li.appendChild(document.createTextNode(task))
    
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class = "fa fa-remove"></i>'
        li.appendChild(link);
        taskList.appendChild(li);
        
        
        taskInput.value = ''
       
    })
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Input Something')
    }else{
        const li = document.createElement('li')
        li.className ='collection-item'
        li.appendChild(document.createTextNode(taskInput.value))
    
        const link = document.createElement('a')
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class = "fa fa-remove"></i>'
        li.appendChild(link);
        taskList.appendChild(li);
        
        storeTaskInLocalStorage(taskInput.value)
        taskInput.value = ''
        e.preventDefault()
    }
}

//storeData
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks))

}


// remove task 
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure')){
            e.target.parentElement.parentElement.remove();

            //remove from storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

//remove from localstorage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//clearTASK
function clearTask(){
    //taskList.innerHTML = '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild)
    }
    clearLocalStorage()
}
//clear storage
function clearLocalStorage(){
    localStorage.clear();
}

function filterTaskEvent(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block'
        }else{
            task.style.display = 'none'
        }
    })
}