/*
=============== 
SELECT ITEMS
===============
*/

const section = document.querySelector('.section');
const planner = document.querySelector('.planner');
const title = document.querySelector('.title');
const dayBtn = document.querySelector('.btn-light');
const nightBtn = document.querySelector('.btn-dark');

const oneDay = document.querySelector('.oneDay');
const oneWeek = document.querySelector('.oneWeek');
const oneMonth = document.querySelector('.oneMonth');
const oneYear = document.querySelector('.oneYear');

const date = document.querySelector('.date');
const input = document.getElementById('input');
const form = document.querySelector('.form')
const goalsList = document.querySelector('.goals-list');
const singleGoal = document.querySelector('.single-goal');
const list = document.querySelector('.goals-center');
const checkBtn = document.querySelector('.btn-check');
const progressBtn = document.querySelector('.btn-progress');
const deleteBtn = document.querySelector('.btn-delete');


/*
=============== 
DATE
===============
*/

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

let time = new Date();

const year = time.getFullYear();
const day  = time.getDate();  

let month = time.getMonth();
month = months[month];
let weekday = time.getDay();
weekday = weekdays[weekday];

/*
=============== 
VARIABLES
===============
*/
let theme = '';
let buttonClicked = '';

/*
=============== 
EVENT LISTENERS
===============
*/

window.addEventListener('DOMContentLoaded', setupItems);

oneDay.addEventListener('click',()=>{
    list.textContent = '';
    date.textContent = `${month} ${day}, ${year}`;
    buttonClicked = 'day';
    setupGoals(buttonClicked);
});
oneWeek.addEventListener('click',()=>{
    list.textContent = '';
    date.textContent = `${weekdays[1]}:${weekdays[0]}`;
    buttonClicked = 'week';
    setupGoals(buttonClicked);
});
oneMonth.addEventListener('click',()=>{
    list.textContent = '';
    date.textContent = `${month}:${year}`;
    buttonClicked = 'month';
    setupGoals(buttonClicked);
});
oneYear.addEventListener('click',()=>{
    list.textContent = '';
    date.textContent = `${year}`;
    buttonClicked = 'year';
    setupGoals(buttonClicked);
});

form.addEventListener('submit', function(e){
    e.preventDefault();
    const value = input.value;
    const id = new Date().getTime().toString();

    if(value !== '' && buttonClicked === 'day'){
        addGoal(value,id);
        addToLocalStorage(id,value,buttonClicked);
        list.textContent = '';
        setupGoals(buttonClicked);
    }
    if(value !== '' && buttonClicked === 'week'){
        addGoal(value,id);
        addToLocalStorage(id,value,buttonClicked);
        list.textContent = '';
        setupGoals(buttonClicked);
    }
    if(value !== '' && buttonClicked === 'month'){
        addGoal(value,id);
        addToLocalStorage(id,value,buttonClicked);
        list.textContent = '';
        setupGoals(buttonClicked);
    }
    if(value !== '' && buttonClicked === 'year'){
        addGoal(value,id);
        addToLocalStorage(id,value,buttonClicked);
        list.textContent = '';
        setupGoals(buttonClicked);
    }
});

/*
=============== 
FUNCTIONS
===============
*/

// add goal
function addGoal(value,id) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("single-goal");
        element.innerHTML = `
        <h4>${value}</h4>
        <div class="goal-btn-container">
            <button class="btn btn-check"><i class="fas fa-check"></i></button>
            <button class="btn btn-progress"><i class="far fa-hourglass"></i></button>
            <button class="btn btn-delete"><i class="fas fa-trash"></i></button>
        </div>
        `;
        // add event listeners to buttons;
        const checkBtn = element.querySelector(".btn-check");
        checkBtn.addEventListener("click", checkFunction);
        const proggressBtn = element.querySelector(".btn-progress");
        proggressBtn.addEventListener("click", progressFunction);
        const deleteBtn = element.querySelector(".btn-delete");
        deleteBtn.addEventListener("click", deleteFunction);
        // append child
        list.appendChild(element);
        // display alert       
        displayAlert("GOAL ADDED!");
        // set back to default
        setBackToDefault(); 
}

// display alert
function displayAlert(text) {
    title.textContent = text;
    // remove alert
    setTimeout(function () {      
        title.textContent = 'GOALS';
    }, 1500);
}

//checkFunction
function checkFunction(e){
    const element = e.currentTarget.parentElement.parentElement;
    element.style.backgroundColor = '#688568';
    displayAlert("GOAL FINISHED!");
}
//progressFunction
function progressFunction(e){
    const element = e.currentTarget.parentElement.parentElement;
    element.style.backgroundColor = '#c8a5a5';
    displayAlert("GOAL IN PROGRESS");
}
//deleteFunction
function deleteFunction(){
    list.textContent = '';
    displayAlert("GOAL DELETED!");
}
 // set back to default
function setBackToDefault(){
    input.value = "";
}

/*
=============== 
LOCAL STORAGE
===============
*/
function addToLocalStorage(id, value,buttonClicked) {
    const goal = { id, value };
    let goals = getLocalStorage(buttonClicked);
    goals.push(goal);
    localStorage.setItem(`${buttonClicked}`, JSON.stringify(goals));
}

function getLocalStorage(buttonClicked) {
    return localStorage.getItem(`${buttonClicked}`) ? JSON.parse(localStorage.getItem(`${buttonClicked}`)) : [];
}

function getInitialStorage() {
    return localStorage.getItem("day") ? JSON.parse(localStorage.getItem("day")) : [];
}

/*
=============== 
SETUP 
===============
*/

function setupGoals(buttonClicked) {
    let goals = getLocalStorage(buttonClicked);
    if (goals.length > 0) {
    goals.forEach(function (goal) {
        createGoal(goal.id, goal.value);
    });
    }
}

function setupItems() {
    let goals = getInitialStorage();
    if (goals.length > 0) {
    goals.forEach(function (goal) {
        createGoal(goal.id, goal.value);
    });
    }
}

function createGoal(id, value) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("single-goal");
    element.innerHTML = `
    <h4>${value}</h4>
    <div class="goal-btn-container">
        <button class="btn btn-check"><i class="fas fa-check"></i></button>
        <button class="btn btn-progress"><i class="far fa-hourglass"></i></button>
        <button class="btn btn-delete"><i class="fas fa-trash"></i></button>
    </div>
    `;
    // add event listeners to buttons;
    const checkBtn = element.querySelector(".btn-check");
    checkBtn.addEventListener("click", checkFunction);
    const proggressBtn = element.querySelector(".btn-progress");
    proggressBtn.addEventListener("click", progressFunction);
    const deleteBtn = element.querySelector(".btn-delete");
    deleteBtn.addEventListener("click", deleteFunction);
    // append child
    list.appendChild(element);
}

/*
=============== 
Light / Dark Theme
===============
*/

dayBtn.addEventListener('click', function(){
    planner.style.backgroundColor = '#ececec';
    section.style.backgroundColor = '#141414';
    title.style.color = '#141414';
    nightBtn.style.color = '#141414';
    oneDay.style.color = '#141414';
    oneWeek.style.color = '#141414';
    oneMonth.style.color = '#141414';
    oneYear.style.color = '#141414';
    date.style.color = '#141414';
    input.style.borderColor = '#141414';
    list.style.borderTop = '1px solid #141414';
    list.style.borderBottom = '1px solid #141414';

    dayBtn.style.display = 'none';
    nightBtn.style.display = 'block';
    theme = 'dark';
});

nightBtn.addEventListener('click',function(){
    planner.style.backgroundColor = '#141414';
    section.style.backgroundColor = '#ececec';
    title.style.color = '#ececec';
    nightBtn.style.color = '#ececec';
    oneDay.style.color = '#ececec';
    oneWeek.style.color = '#ececec';
    oneMonth.style.color = '#ececec';
    oneYear.style.color = '#ececec';
    date.style.color = '#ececec';
    input.style.borderColor = '#ececec';
    list.style.borderTop = '1px solid #ececec';
    list.style.borderBottom = '1px solid #ececec';

    dayBtn.style.display = 'block';
    nightBtn.style.display = 'none';
    theme = 'light';
});