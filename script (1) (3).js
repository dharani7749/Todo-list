document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const taskList = document.getElementById('task-list');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const taskText = input.value.trim();
        const priority = prioritySelect.value;
        if (taskText !== '') {
            addTask(taskText, priority);
            input.value = '';
            prioritySelect.value = 'medium';
        }
    });

    function addTask(text, priority) {
        const li = document.createElement('li');
        li.className = `task-item ${priority}`;

        // Task text element
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = text;
        taskText.title = 'Click to edit task';
        li.appendChild(taskText);

        // Mark complete toggle on text click
        taskText.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Edit on double click
        taskText.addEventListener('dblclick', () => {
            editTask(taskText, li);
        });

        // Task action buttons container
        const actions = document.createElement('div');
        actions.className = 'task-actions';

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.title = 'Edit task';
        editBtn.addEventListener('click', () => editTask(taskText, li));
        actions.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.title = 'Delete task';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener('click', () => {
            li.remove();
        });
        actions.appendChild(deleteBtn);

        li.appendChild(actions);

        taskList.appendChild(li);
    }

    function editTask(taskTextElem, li) {
        const currentText = taskTextElem.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText;
        input.className = 'task-text editing';
        li.replaceChild(input, taskTextElem);
        input.focus();

        // Save edit on blur or enter
        function saveEdit() {
            const newText = input.value.trim();
            if (newText.length > 0) {
                taskTextElem.textContent = newText;
            }
            li.replaceChild(taskTextElem, input);
        }

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveEdit();
            } else if (e.key === 'Escape') {
                li.replaceChild(taskTextElem, input);
            }
        });
    }
});