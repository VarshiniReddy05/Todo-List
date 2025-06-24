const taskForm = document.getElementById('taskForm');
const todayPanel = document.getElementById('today');
const upcomingPanel = document.getElementById('upcoming');
const completedPanel = document.getElementById('completed');

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskName = document.getElementById('taskName').value.trim();
  const email = document.getElementById('email').value.trim();
  const dueDate = document.getElementById('dueDate').value;

  if (!taskName || !email || !dueDate || !validateEmail(email)) {
    alert('Please fill all required fields correctly.');
    return;
  }

  const taskEl = document.createElement('div');
  taskEl.classList.add('task');
  taskEl.innerHTML = `
    <span>${taskName} - ${dueDate}</span>
    <div class="task-actions">
      <button onclick="editTask(this)">✏️</button>
      <button onclick="completeTask(this)">✅</button>
      <button onclick="removeTask(this)">❌</button>
    </div>
  `;

  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0,0,0,0);

  if (due.toDateString() === today.toDateString()) {
    todayPanel.appendChild(taskEl);
  } else if (due > today) {
    upcomingPanel.appendChild(taskEl);
  } else {
    alert('Past date task, adding to Today.');
    todayPanel.appendChild(taskEl);
  }

  taskForm.reset();
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showPanel(panelId) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById(panelId).classList.add('active');
}

function removeTask(btn) {
  btn.closest('.task').remove();
}

function completeTask(btn) {
  const task = btn.closest('.task');
  completedPanel.appendChild(task);
}

function editTask(btn) {
  const task = btn.closest('.task');
  const span = task.querySelector('span');
  const [text, date] = span.innerText.split(' - ');

  const newText = prompt('Edit Task Name:', text);
  if (newText) {
    span.innerText = `${newText} - ${date}`;
  }
}
