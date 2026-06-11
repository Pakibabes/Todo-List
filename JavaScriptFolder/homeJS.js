// Check if user is logged in
const currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = "login.html";
}

// Display welcome message
const usernameSpan = document.getElementById('username-span');
if (usernameSpan) {
    usernameSpan.textContent = currentUser;
}

// Logout event listener
const btnLogout = document.getElementById('btnLogout');
if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = "login.html";
    });
}

const form = document.querySelector('form');
const todoInput = document.getElementById('todoInput');
const todoUL = document.getElementById('todo-ul');

// Load user-specific todos from localStorage
let lists = JSON.parse(localStorage.getItem(`todos_${currentUser}`) || '[]');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})

function saveTodos() {
    localStorage.setItem(`todos_${currentUser}`, JSON.stringify(lists));
}

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){     
        lists.push({
            text: todoText,
            completed: false
        });
        saveTodos();
        getAllTodoList();
        todoInput.value = "";
    }
}

function createTodoItem(todo, todoIndex){
    const todoId = "todo-" + todoIndex;
    const todoItem = document.createElement('li');
    todoItem.className = "todo";
    if (todo.completed) {
        todoItem.classList.add("completed");
    }

    todoItem.innerHTML = `
        <input type="checkbox" id="${todoId}" ${todo.completed ? 'checked' : ''}>
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <span class="todo-text">${todo.text}</span>
        <input type="text" class="edit-input" value="${todo.text}">
        <button class="editBtn">
            <svg class="edit-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00C26E">
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
            </svg>
            <svg class="save-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00C26E" style="display: none;">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </button>
        <button class="deleteBtn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00C26E">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;

    const checkbox = todoItem.querySelector(`input[type="checkbox"]`);
    const todoTextSpan = todoItem.querySelector(".todo-text");
    const editInput = todoItem.querySelector(".edit-input");
    const editBtn = todoItem.querySelector(".editBtn");
    const deleteBtn = todoItem.querySelector(".deleteBtn");
    const editIcon = todoItem.querySelector(".edit-icon");
    const saveIcon = todoItem.querySelector(".save-icon");

    // Checkbox completed toggle logic
    checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked;
        saveTodos();
    });

    // Edit button click logic
    editBtn.addEventListener('click', () => {
        const isEditing = todoItem.classList.contains("editing");
        if (isEditing) {
            // Save the edited text
            const newText = editInput.value.trim();
            if (newText.length > 0) {
                todo.text = newText;
                todoTextSpan.textContent = newText;
                saveTodos();
            }
            todoItem.classList.remove("editing");
            editIcon.style.display = "block";
            saveIcon.style.display = "none";
        } else {
            // Enter editing mode
            todoItem.classList.add("editing");
            editIcon.style.display = "none";
            saveIcon.style.display = "block";
            editInput.focus();
            // Put cursor at the end of the text
            const textLength = editInput.value.length;
            editInput.setSelectionRange(textLength, textLength);
        }
    });

    // Keydown event in edit mode (Enter to save, Esc to cancel)
    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            editBtn.click();
        } else if (e.key === 'Escape') {
            editInput.value = todo.text;
            todoItem.classList.remove("editing");
            editIcon.style.display = "block";
            saveIcon.style.display = "none";
        }
    });

    // Delete button click logic
    deleteBtn.addEventListener("click", () => {
        deleteTodoItem(todoIndex);
    });

    return todoItem;
}

function getAllTodoList(){
    todoUL.innerHTML = "";
    lists.forEach((todo, todoIndex)=> {
        const todoItem = createTodoItem(todo, todoIndex);
        todoUL.append(todoItem);
    })
}

function deleteTodoItem(todoIndex){
    lists = lists.filter((_, i) => i !== todoIndex);
    saveTodos();
    getAllTodoList();
}

// Initial render
getAllTodoList();