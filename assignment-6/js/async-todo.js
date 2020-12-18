const contentPath = "/data/todo.json"; //set Json Path
let xhr = new XMLHttpRequest();
xhr.open('GET', contentPath);
xhr.onload = (evt) => {
    if (evt.target.status === 200) { //check status if it is ok or not
        storeTodoItems(evt); // store data in JSON file to local storage initially 
    }
}
/**
 * generate html elements using javascript
 * @param {*} toDoItem 
 */
let createViewDetails = function (toDoItem) {
    // div element creation
    let div = document.createElement("div");
    div.id = "detail-view-div" + toDoItem.title;

    // Table Creation
    let table = document.createElement("table");
    table.className = "table";


    let tr = document.createElement("tr"); // Table row creation

    let td = document.createElement("td"); // Table Data Creation
    td.innerText = "Title:";

    let valTitle = document.createElement("td"); // value title
    valTitle.innerText = toDoItem.title;
    //add it to row 
    tr.appendChild(td);
    tr.appendChild(valTitle);

    // create another row and data
    let trDesc = document.createElement("tr");
    let tdDesc = document.createElement("td");

    // create value description
    trDesc.innerText = "Description:";
    let valDesc = document.createElement("td");
    valDesc.innerText = toDoItem.description;
    //append that to table
    trDesc.appendChild(tdDesc);
    trDesc.appendChild(valDesc);

    // Date element creation in a row and data
    let trDate = document.createElement("tr");
    let tdDate = document.createElement("td");
    tdDate.innerText = "Date:";
    let valDate = document.createElement("td");
    valDate.innerText = toDoItem.date;
    // Append that value to table
    trDate.appendChild(tdDate);
    trDate.appendChild(valDate);

    let trTime = document.createElement("tr");
    let tdTime = document.createElement("td");
    tdTime.innerText = "Time:";
    let valTime = document.createElement("td");
    valTime.innerText = toDoItem.time;
    // Append time value in table
    trTime.appendChild(tdTime);
    trTime.appendChild(valTime);


    let trStatus = document.createElement("tr");
    let tdStatus = document.createElement("td");
    tdStatus.innerText = "Status: ";
    let valStatus = document.createElement("td");
    if (toDoItem.status) { //Assining status to  ToDo based on condition
        valStatus.innerText = "Done!";
    } else {
        valStatus.innerText = "ToDo!";
    }
    // Append value to Table
    trStatus.appendChild(tdStatus);
    trStatus.appendChild(valStatus);


    // Append all values to table
    table.appendChild(tr);
    table.appendChild(trDesc);
    table.appendChild(trDate);
    table.appendChild(trTime);
    table.appendChild(trStatus);

    div.appendChild(table); // Append table to Div
    div.style.display = "none"; // Set display style to none
    return div;
}



/**
 * dynamically generate html elements using javascript
 * @param {*} todoItems 
 */
let createNewTodoItem = function (todoItems) {

    // create <li>
    let li = document.createElement("li");

    // create <input type="checkbox">
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    if (todoItems.status) {
        checkBox.checked = true;
    }

    // create <label>
    let label = document.createElement("label");
    label.innerText = todoItems.title;

    // create <button> view </button>
    let viewBtn = document.createElement("button");
    viewBtn.innerText = "View";
    viewBtn.className = "view";

    // create <button> delete </button>
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete";

    li.appendChild(checkBox);
    li.appendChild(label);
    li.appendChild(viewBtn);
    li.appendChild(deleteBtn);

    return li;
}

window.onload = function () {
    // initialize 
    init();
    // initializa todo and completed list    
    initTodoItems();
    // bind all the button Events
    bindAllEvents();
}

xhr.send(); // send 

let todoItemsMap = {};

/**
 * init add new to-do item and hide it
 */
let init = function () {
    document.getElementById("add-new").style.display = "none"; // Set display style to none
    document.getElementById("add-btn").onclick = addNewTodoItem; // On click show add button

}

/**
 * initially store the data for JSON file to the local storage
 * @param {*} evt 
 */
let storeTodoItems = function (evt) {
    if (window.localStorage.getItem("firstTimeUserMark") !== "marked") { // stores one todo at a time
        setTodoItemsToMap(evt);
        setMapToLocalStorage();
        window.localStorage.setItem("firstTimeUserMark", "marked");
    }
}

/**
 * set new todo item in todoitemMap
 * @param {*} evt 
 */
let setTodoItemsToMap = function (evt) {
    let todoItemsList = JSON.parse(evt.target.responseText);
    todoItemsList.forEach(todoItem => {
        todoItemsMap[todoItem.title] = todoItem;
    });
}

/**
 * get todo item object
 * @param {*} title 
 */
let getTodoItemByTitle = function (title) {
    return getTodoItemsFrLocalStorage()[title]; // return title
}

/**
 * set updated map to  the local storage => JSON
 */
let setMapToLocalStorage = function () {
    localStorage.setItem("todoItemsMap", JSON.stringify(todoItemsMap));
}

/**
 * get todo items list for map in localstorage => JSON
 */
let getTodoItemsFrLocalStorage = function () {
    todoItemsMap = JSON.parse(window.localStorage.getItem("todoItemsMap")); // Json Parse
    return todoItemsMap;
}


/**
 * delete todo item for map and update map in local storage=>Json
 * @param title of the todo item
 */
let deleteTodoItem = function (title) {
    delete todoItemsMap[title]; // delete todo item using title
    setMapToLocalStorage(); // Again set local storage
}


/**
 * display todo List, todo Items and complete list
 */
let initTodoItems = function () {
    let todoItemBlock = document.getElementById('todo-list');
    let completeItemBlock = document.getElementById('complete-list');
    getTodoItemsFrLocalStorage(); // get local storage
    let keys = Object.keys(todoItemsMap); // initialize key 
    keys.forEach(key => { // for loop for the keys
        let todoItems = todoItemsMap[key];
        if (todoItems.status) {
            appendTodoItem(todoItems, completeItemBlock); // append items
        } else {
            appendTodoItem(todoItems, todoItemBlock);
        }
    })

}

/**
 * bind events to all buttons
 */
let bindAllEvents = function () {
    let todoItemBlock = document.getElementById('todo-list');
    let completeItemBlock = document.getElementById('complete-list');
    // bind event to btns in todo Item Holder
    for (let i = 0; i < todoItemBlock.children.length; i++) {
        if (todoItemBlock.children[i].matches("li")) {
            bandEventInTodoList(todoItemBlock.children[i]);
        }
    }
    // bind event to buttons in completed Item Holder
    for (let i = 0; i < completeItemBlock.children.length; i++) {
        if (completeItemBlock.children[i].matches("li")) {
            bandEventInTodoList(completeItemBlock.children[i]);
        }
    }
    bindAddNewBtn(); //method call for bind event button
}

/**
 * bind event to add new todo button
 */
let bindAddNewBtn = function () {
    let addNewBtn = document.getElementById("add-new-btn");
    addNewBtn.addEventListener("click", function (event) { // Show and Hide 
        let addNewDivBlock = document.getElementById("add-new");
        // toggle Hide and Show 
        if (addNewDivBlock.style.display === "none") { // Set display style none
            addNewDivBlock.style.display = "grid";
        } else {
            addNewDivBlock.style.display = "none"; // set display style none
        }
    });

}


/**
 * bind event listener to checkbox and view button
 * @param {*} todoItemElements 
 */
let bandEventInTodoList = function (todoItemElements) {
    let checkbox = todoItemElements.querySelector("input[type=checkbox]");
    let viewBtn = todoItemElements.querySelector("button.view");
    let deleteBtn = todoItemElements.querySelector("button.delete");
    let title = todoItemElements.querySelector("label").innerText;
    deleteBtn.addEventListener("click", () => { // Delete button
        deleteTodoItem(title);
        location.reload();
    });


    /**
     *add event listener on checkbox change, and make change on item in localstorage=> JSON
     */
    checkbox.addEventListener("change", (event) => {
        let todoItems = getTodoItemByTitle(title);
        window.localStorage.removeItem(title);
        if (todoItems.status) {
            todoItems.status = false;
        } else {
            todoItems.status = true;
        }
        todoItemsMap[todoItems.title] = todoItems;
        console.log(todoItemsMap);
        setMapToLocalStorage();
        location.reload(); // reload
    });


    /**
     *add event listener on view Button click, and show detail views for the sepcific selected item
     */
    viewBtn.addEventListener("click", function (event) {
        let viewDiv = "detail-view-div" + title;
        let divViewDetails = document.getElementById(viewDiv);
        if (divViewDetails.style.display === "none") {
            divViewDetails.style.display = "block";
        } else {
            divViewDetails.style.display = "none";
        }
    });
}

/**
 * populate new todo item object and add to local storage, and call appendTodoItem function
 */
let addNewTodoItem = function () {
    if (document.getElementById("title-input").value == "" ||
        document.getElementById("description-input").value == "" ||
        document.getElementById("date-input").value == "" ||
        document.getElementById("time-input").value == "") {
        return;
    }
    let todoItem = {
        "title": document.getElementById("title-input").value,
        "description": document.getElementById("description-input").value,
        "date": document.getElementById("date-input").value,
        "time": document.getElementById("time-input").value,
        "status": false
    }
    todoItemsMap[todoItem.title] = todoItem;
    setMapToLocalStorage();
    appendTodoItem(todoItem, document.getElementById('todo-list'));

}

/**
 * append todoItems and it's detail view (hiding) to todo-item list holder
 * @param {*} todoItems 
 * @param {*} parent 
 */
let appendTodoItem = function (todoItems, parent) {
    parent.appendChild(createNewTodoItem(todoItems));
    parent.appendChild(createViewDetails(todoItems));
}

/**
 * remove appended child by uncheck
 * @param {*} todoItems 
 * @param {*} parent 
 */
let unCheckTodoItem = function (todoItems, parent) {
    parent.removeChild(todoItems);
    parent.removeChild(document.getElementById("detail-view-div" + todoItems.title));
}