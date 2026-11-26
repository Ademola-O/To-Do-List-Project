# To-Do List

A simple task planner built with plain HTML, CSS and JavaScript. Add tasks, tick them off, remove them, and see how many are left. No frameworks and nothing to install.



**Live demo:** https://ademola-o.github.io/To-Do-List-Project/

## Features

- **Add tasks** by clicking **Add Task** or pressing **Enter**
- **Blank tasks are rejected,** and the cursor goes back to the input box
- **Tick a task** as done, which strikes the text through
- **Remove a task** with its Remove button
- **Live counter** showing how many tasks are still to do
- **Empty state** message when there are no tasks
- **Hover and focus effects,** a slide-in animation for new tasks, and a custom-drawn checkbox

## Built with

- HTML5
- CSS3: variables, flexbox, a keyframe animation, and a checkbox drawn with `:checked` and `::after`
- JavaScript (no libraries)
- Google Fonts (Playfair Display and Source Sans 3)

## Project structure

```
todo-list/
├── index.html        The page structure
├─- style.css         All styling
├── toDo_script.js    All the logic
└── README.md
```

## Running it

There's no build step and no server needed. Download or clone the project and open `index.html` in your browser.

```
git clone https://github.com/Ademola-O/To-Do-List-Peoject.git
```

## How it works

1. Tasks are stored in an array called `tasks`. Each task is an object with two properties: `text` (what to do) and `done` (true or false).
2. `addTask()` reads the input box, rejects empty text with `.trim()`, adds a new task object with `push`, clears the box and redraws the list.
3. `displayTasks()` clears the list and rebuilds it from the array. It counts the unfinished tasks with `.filter()`, then loops with `forEach` to create a list item for each task with a checkbox, the text and a Remove button.
4. `toggleDone()` flips a task's `done` value, and `removeTask()` removes a task with `splice`. Both then call `displayTasks()` again.
5. A `keydown` listener on the input lets the Enter key add a task.

**Design choice:** the screen is always redrawn from the array after every change, so the array is the single source of truth. That avoids duplicate items and a counter that is out of date.

## Known limitations

- Tasks are not saved. They disappear when the page is refreshed.
- Task text is currently inserted with `innerHTML`. It should use `textContent` so typed text can never be treated as code.
- Tasks are identified by their position in the list, not a unique id.

## Ideas for next steps

- [ ] Save tasks with `localStorage`
- [ ] Switch to `textContent` for task text, and use unique ids
- [ ] Edit existing tasks
- [ ] Due dates and priorities
- [ ] Filter by all, active and completed
- [ ] "Clear completed" button

## What I learned

- Storing data as an array of objects
- Array methods: `push`, `splice`, `filter` and `forEach`
- Building page elements with `createElement` and `appendChild`
- Handling `click`, `change` and `keydown` events
- Redrawing the interface from the data after every change
- CSS variables, flexbox and styling a custom checkbox

## Author

Ademola Okesanjo ([GitHub](https://github.com/Ademola-O) · [LinkedIn](https://www.linkedin.com/in/ademola-o-400802130/))
