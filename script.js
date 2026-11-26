// JavaScript file to handle all the logic for the to-do list
// - Storing tasks in an array
// - Adding new tasks 
// - Displaying tasks in the page
// - Removing tasks 
// - Ticking tasks as done

// ---- Creating The Tasks Array --------------------------------------- 
// An array is an ol that can hold multiple values. We declare it with 'let'
// not 'const' because items will get pushed in and spliced out over time. 
// It starts empty: [] mean "no items yet".
let tasks = [];


// ---- addTasks() ----------------------------------------------------------
// function thats called when user clicks "Add Task" or presses Enter.
// Reads the input field then adds the text to the tasks array, then calls 'displayTasks()'
// to refresh whats shown on screen.
function addTask() {

    // 'document.getElementById()' searches the HTML for an element with the ID 
    // attribute that matches wht we put in the parameter.
    const input = document.getElementById("taskInput");
    const taskText = input.value;

    // '.trim()' removes any white space (spaces, tabs) from the start and end of
    // the string - Prevenst saving blank tasks.
    // If the trimmed value is an empty string '', function stops here.
    if (taskText.trim() === "") {
        input.focus();  // Move cursor back to the field 
        return;         // Stop the function 
    }

    // Build a task object. Instead of storing just the text as a plain string, I
    // store an object with two properties:
    // text - task description the user typed
    // done - wheather the task has been ticked as done (starts as false)

    // Using an object to do this makes it easier to add more properties later without
    // needing to re-write everything (e.g. due date, priority) 

    const newTask = {
        text: taskText.trim(),  // save the trimmed version
        done: false             // new tasks start as not done
    };

    // '.push()' adds the new task object onto the end of the array.
    // After this 'tasks[tasks.length -1]' is our new task.
    tasks.push(newTask);

    // Clear input field so user can type the next task without needing to manuallly 
    // delete previous entry.
    input.value = "";

    // Move cursor back to the input filed so user can type again without needing to 
    // click the field.
    input.focus();

    // Call displayTasks() to rebuild the list on screen so the new task
    // appears immedaitely. 
    displayTasks();
}


// ---- displayTasks() --------------------------------------------------------------------
// Rebuilds the entire task list on screen from scratch. 
// Called after every change - add, remove or toggle done so the page always updates 
function displayTasks() {

    // Get references to the HTML elements I need to update
    const list = document.getElementById("taskList");
    const countSpan = document.getElementById("taskCount");

    // Wipe the list. clean before redrawing
    // 'innerHTML = ""' deletes all child elements inside '<ul id="taskList">'
    // This is done to avoid duplicates: if we just apppended new items each time
    // the list would grow forever even after removals.
    list.innerHTML = ""; 

    // If there are no tasks, show a empty-state message and stop.
    // 'return' exits the function early.
    if (tasks.length === 0) {
        list.innerHTML = 
        '<div class="empty-state">' +
                '<div class="empty-icon">✓</div>' +
                '<p>Nothing to do yet.<br>Add a task above to get started.</p>' +
            '</div>';

        countSpan.textContent = "0" // reset the counter in the header
        return;
    }

    // Count how many tasks are NOT done yet and show in header.
    // '.filter()' creates a new array of only the items that psss a test.
    // The current test is: task.done === false (e.g not yet ticked)
    // '.length()' on that filtered array gives us the count.
    const remaining = tasks.filter(function (task) {
        return task.done === false;
    }).length;

    countSpan.textContent = remaining; 

    // Loop through every task in array and create an HTML element for it.
    // forEach visist each item one at a time.
    // 'task' is the current item; 'index' is its positon (0, 1, 2, 3,...). 
    tasks.forEach(function (task, index) {


        // 'document.createElement("li")' builds a new <li> element in memeory and 
        // doesnt display until I 'appendCild()' it.
        const li = document.createElement("li");
        li.className = "task-item";

        // Build a unique id for the checkbox so its <label> can link to it.
        // Using the index keeps each id different: "task-0", "task-1", etc.
        const checkboxId = "task-" + index;

        // innerHTML fills the <li> with its child HTML.
        // We insert: 
        // A checkbox input - that ticks as tasks get completed 
        // A <span> with the task text (gets strikethrough when done) 
        // a remove button that calls 'removeTask()' with a specified tasks index
        // 
        // The 'done' class on the <span> is added conditionally: 
        //  'task.done ? "done" : ""' is a ternary operator - a shorthand if/else.
        // meaning - If task.done is true - add Class "done"; else if false - add nothing.
        li.innerHTML =
            '<input type="checkbox" class="task-checkbox" id="' + checkboxId + '"' +
                (task.done ? ' checked' : '') +
            '>' +
            '<label class="task-text ' + (task.done ? 'done' : '') + '" for="' + checkboxId + '">' +
                task.text +
            '</label>' +
            '<button class="remove-btn" onclick="removeTask(' + index + ')">Remove</button>';

        // Checkbox doesnt use onclick in HTML - instead I added an event listner in 
        // JS to call 'toggleDone()' when it changes. 
        // 'querySelector' searches INSIDE!! the <li> for the checkbox.
        const checkbox = li.querySelector(".task-checkbox");
        checkbox.addEventListener("change", function () {
            toggleDone(index);
        });

        // 'appendChild()' places finsihed <li> inside the <ul> to make it visible 
        // on the page.
        list.appendChild(li);  
    });
}


// ------- removeTask() ---------------------------------------------------------------
// Removes one task from the array byn its position (index).
// Called by the remove button on each task item.
function removeTask(index) {
    // '.splice(start, deleteCount)' modifies an array in place.
    // start - thr position to begin removing from 
    // deleteCount - hot many items to remove (1 = singular task)
    tasks.splice(index, 1);

    // redraw the list so the removed task disappears immediately 
    displayTasks();
}


// ----- toggleDone() ----------------------------------------------------------------
// Called when a checkbox is ticked or unticked.
// Flips the task's 'done' property between true and false then redraws the list 
// to apply or remove the strikethrough.
function toggleDone(index) {

    // If task.done was false, !false = true (now done).
    // If task.done was true , !true = false (now undone).
    tasks[index].done = !tasks[index].done;

    // Redraw so the strikethrough and header count update
    displayTasks();
}


// ---- Enter key support -----------------------------------------------------------
// Allows users to press the Enter key instead of clicking "Add Task".
// Works by listening for a 'keydown' event on the input field. 
document.getElementById("taskInput").addEventListener("keydown", function (event) {
    // 'event.key' is a string like "Enter", "Backspace", "a", etc,
    // If the user pressed Enter, call 'addTask()' just like the button does.
    if (event.key === "Enter") {
        addTask();
    }
});


// ---- Initial render -----------------------------------------------------------------
// Call 'displayTasks()' once when the page first loads.
// This shows the empty state message immediately rather than leaving black space where 
// the list should be.
displayTasks();
