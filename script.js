let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;
    const dayFilter = document.getElementById('dayFilter').value;

    if (taskText === '') return;

    const newTask = {
        text: taskText,
        day: dayFilter,
        completed: false,
        subtasks: []
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const dayFilter = document.getElementById('dayFilter').value;

    let filteredTasks = tasks;
    if (dayFilter !== 'all') {
        filteredTasks = tasks.filter(task => task.day === dayFilter);
    }

    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('task-completed');
        }

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const completeButton = document.createElement('button');
        completeButton.textContent = '✔';
        completeButton.onclick = () => toggleCompleteTask(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '✖';
        deleteButton.onclick = () => deleteTask(index);

        taskElement.appendChild(taskText);
        taskElement.appendChild(completeButton);
        taskElement.appendChild(deleteButton);

        if (task.subtasks.length > 0) {
            const subtaskList = document.createElement('ul');
            subtaskList.classList.add('subtask-list');

            task.subtasks.forEach((subtask, subIndex) => {
                const subtaskElement = document.createElement('li');
                subtaskElement.textContent = subtask.text;

                const subtaskCompleteButton = document.createElement('button');
                subtaskCompleteButton.textContent = '✔';
                subtaskCompleteButton.onclick = () => toggleCompleteSubtask(index, subIndex);

                subtaskElement.appendChild(subtaskCompleteButton);
                subtaskList.appendChild(subtaskElement);
            });

            taskElement.appendChild(subtaskList);
        }

        taskList.appendChild(taskElement);
    });

    updateProgress();
}

function toggleCompleteTask(taskIndex) {
    const task = tasks[taskIndex];
    if (task.subtasks.length > 0) {
        if (task.subtasks.every(subtask => subtask.completed)) {
            task.completed = !task.completed;
        } else {
            alert('Complete all subtasks first!');
        }
    } else {
        task.completed = !task.completed;
    }

    renderTasks();
}

function toggleCompleteSubtask(taskIndex, subtaskIndex) {
    const subtask = tasks[taskIndex].subtasks[subtaskIndex];
    subtask.completed = !subtask.completed;

    if (tasks[taskIndex].subtasks.every(subtask => subtask.completed)) {
        tasks[taskIndex].completed = true;
    }

    renderTasks();
}

function deleteTask(taskIndex) {
    tasks.splice(taskIndex, 1);
    renderTasks();
}

function updateProgress() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progress = document.getElementById('progress');

    if (totalTasks === 0) {
        progress.style.width = '0%';
    } else {
        const progressPercentage = (completedTasks / totalTasks) * 100;
        progress.style.width = `${progressPercentage}%`;
    }
}
