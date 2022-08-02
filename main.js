let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTask = [];

//Check If There Is Tasks In The Local Storage
if(window.localStorage.getItem("tasks")){
    arrayOfTask  = JSON.parse(window.localStorage.getItem("tasks"));
}

getDataFromLocalStorage();
//Add Task 
submit.onclick = () => {
    if(input.value === "") window.alert("Enter The Task Name!");
    if(input.value !== ""){
        addTaskToArray(input.value);
        input.value = "";
    }
}

//Delete Button 
tasksDiv.addEventListener("click", (e) => {
    if(e.target.classList.contains("del")){ 
        //Remove Tasks From LocalStorage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        //Remove Tasks From The Page
        e.target.parentElement.remove();
    }
    //Update Element 
    if(e.target.classList.contains("task")){
        //Toggle Completed For The Task
        toggleStatusTask(e.target.getAttribute("data-id"));
        //Toggle Done Class
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(taskText){
    //Task Data
    const task = { 
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    //Push Tasks To The Array
    arrayOfTask.push(task);
    //Add Tasks To The Page
    addElementToThePage(arrayOfTask);
    //Add Tasks To Local Storage
    addDataToLocalStorage(arrayOfTask);

}
function addElementToThePage(addTaskToArray){
    //Empty The Tasks Div
    tasksDiv.innerHTML = "";
    addTaskToArray.forEach((task) => {
        //Create Main Div 
        let div = document.createElement("div");
        div.className = "task";
        //Check If  Task Is Done
        if(task.completed){
            div.classList.add("done");
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        //Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        //Append Button To Main Div
        div.appendChild(span);
        //Add Main Div To Taks Div
        tasksDiv.appendChild(div);
    });
}
function addDataToLocalStorage(arrayOfTask){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTask));
}
function getDataFromLocalStorage(){
    let data =  window.localStorage.getItem("tasks");
    if(data){
        let task = JSON.parse(data);
        addElementToThePage(task);
    }
}
function deleteTaskWith(taskId){
    arrayOfTask = arrayOfTask.filter((task) => task.id != taskId);
    addDataToLocalStorage(arrayOfTask);
}
function toggleStatusTask(taskId){
    for(let i = 0 ; i < arrayOfTask.length ; i++){
        if(arrayOfTask[i].id == taskId){
            if(arrayOfTask[i].completed === true){
                arrayOfTask[i].completed = false;
            }else{
                arrayOfTask[i].completed = true;
            }
        }
    }
    addDataToLocalStorage(arrayOfTask);
}