const addTaskBtn = document.querySelector(".add-task-btn");
const canceladdtBtn = document.querySelector(".cancel-button-addt");
const addTaskBox = document.querySelector(".add-task-box");
const overlay = document.querySelector(".overlay");
const updateCancelbtn = document.querySelector(".cancel-button-dltt");
const updateTaskBox = document.querySelector(".update-task-box");
const deleteConfirmationBox = document.querySelector(
  ".delete-confirmation-box"
);
const cancelBtndelete = document.querySelector(".cancel-btn-delete");
const updateTitleField = document.querySelector("#titleUpdate");
const updateDescriptionField = document.querySelector("#descriptionUpdate");
const columns = document.querySelectorAll(".column");
const cards = document.querySelectorAll(".card-task");
let updateSave = document.querySelectorAll(".js-save-update");
let draggedCard = null;
let currentID = null;
const closeAllPopups = () => {
  overlay.classList.remove("show");
  addTaskBox.classList.remove("show");
  updateTaskBox.classList.remove("show");
  deleteConfirmationBox.classList.remove("show");

  document.querySelectorAll(".more-menu-card").forEach((menu) => {
    menu.style.display = "none";
  });
};

cards.forEach((card) => {
  card.addEventListener("dragstart", () => {
    draggedCard = card;
    setTimeout(() => (card.style.display = "none"), 0);
  });

  card.addEventListener("dragend", () => {
    draggedCard.style.display = "block";
    updateStage(draggedCard);
    draggedCard = null;
    calculateTasks();
  });
});

columns.forEach((col) => {
  col.addEventListener("dragover", (e) => {
    e.preventDefault();
    col.classList.add("drag-over");
  });

  col.addEventListener("dragleave", () => {
    col.classList.remove("drag-over");
  });

  col.addEventListener("drop", (e) => {
    e.preventDefault();
    col.classList.remove("drag-over");
    const contentArea = col.querySelector(".content");
    let firstChild = contentArea.firstElementChild;
    if (draggedCard && contentArea) {
      firstChild.after(draggedCard);
    }
    calculateTasks();
  });
});

addTaskBtn.addEventListener("click", () => {
  closeAllPopups();
  addTaskBox.classList.add("show");
  overlay.classList.add("show");
});

canceladdtBtn.addEventListener("click", closeAllPopups);
updateCancelbtn.addEventListener("click", closeAllPopups);
cancelBtndelete.addEventListener("click", closeAllPopups);

document.querySelectorAll(".more-card-svg-box").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = button.closest(".card-task");
    const menu = card.querySelector(".more-menu-card");
    const isCurrentlyOpen = getComputedStyle(menu).display === "block";
    closeAllPopups();
    if (!isCurrentlyOpen) {
      menu.style.display = "block";
    }
  });
});

document.querySelectorAll(".edit-task-li").forEach((button) => {
  button.addEventListener("click", (e) => {
    closeAllPopups();
    const card = e.target.closest(".card-task");
    const id = card.getAttribute("data-card-id");
    currentID = id;
    const description = card.querySelector(".card-content p").innerText;
    const title = card.querySelector(".title-card").innerText;
    updateTitleField.value = title;
    updateDescriptionField.value = description;
    updateTaskBox.classList.add("show");
    overlay.classList.add("show");
  });
});

document.querySelectorAll(".delete-task-li").forEach((button) => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".card-task");
    const id = card.getAttribute("data-card-id");
    currentID = id;
    closeAllPopups();
    deleteConfirmationBox.classList.add("show");
    overlay.classList.add("show");
  });
});

window.addEventListener("click", (e) => {
  const target = e.target;
  if (
    target.closest(".popup") ||
    target.closest(".add-task-btn") ||
    target.closest(".more-card-svg-box")
  ) {
    return;
  }
  closeAllPopups();
});

function calculateTasks() {
  let toDoCount = 0;
  const toDoCards = document.querySelector(".content-to-do");
  let elements1 = Array.from(toDoCards.children);
  elements1.forEach((element) => {
    if (element.classList.contains("card-task")) {
      toDoCount++;
    }
  });
  document.querySelector(".content-tasks-count-todo").innerText = toDoCount;
  let inProgressCount = 0;
  const inProgressCards = document.querySelector(".content-in-progress");
  let elements2 = Array.from(inProgressCards.children);
  elements2.forEach((element) => {
    if (element.classList.contains("card-task")) {
      inProgressCount++;
    }
  });
  document.querySelector(".content-tasks-count-inProgress").innerText =
    inProgressCount;
  inProgressCount;
  let doneCount = 0;
  const doneCards = document.querySelector(".content-done");
  let elements3 = Array.from(doneCards.children);
  elements3.forEach((element) => {
    if (element.classList.contains("card-task")) {
      doneCount++;
    }
  });
  document.querySelector(".content-tasks-count-done").innerText = doneCount;
}
calculateTasks();

function sendNotification() {
  let notifier = document.querySelector(".task-created-notifier");
  notifier.style.transform = "translateX(0px)";
  setTimeout(() => {
    notifier.style.transform = "translateX(-500px)";
  }, 5000);
}

updateSave.forEach((button) => {
  button.addEventListener("click", async (e) => {
    let box = button.closest(".add-task-box-wrapper");
    let title = box.querySelector("#titleUpdate").value;
    let description = box.querySelector("#descriptionUpdate").value;
    let card = document.querySelector(`[data-card-id="${currentID}"]`);
    await updateTask(currentID, title, description, card);
    closeAllPopups();
  });
});

async function updateTask(id, title, description, card) {
  const response = await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description: description,
      name: title,
    }),
  });
  if (response.ok) {
    card.querySelector(".title-card").innerText = title;
    card.querySelector(".card-content p").innerText = description;
  }
}

async function updateStage(card) {
  let column = card.closest(".column");
  if (column.classList.contains("to-do-column")) {
    stage = "To Do";
  } else if (column.classList.contains("in-progress-column")) {
    stage = "In Progress";
  } else if (column.classList.contains("done-column")) {
    stage = "Done";
  }

  let response = await fetch(
    `http://localhost:5000/api/v1/tasks/stage/${card.getAttribute(
      "data-card-id"
    )}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        stage: stage,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  if (response.ok) {
    showConfirmation("Task Stage Updated");
  }
}

let button = document.querySelector(".js-save-add");
button.addEventListener("click", async () => {
  await createCard();
});

async function createCard() {
  let task = button.closest(".add-task-box-wrapper");
  let description = task.querySelector(
    ".description-wrapper #description"
  ).value.trim();
  let title = task.querySelector(".title-wrapper #title").value.trim();
  let response = await fetch("http://localhost:5000/api/v1/tasks", {
    method: "POST",
    body: JSON.stringify({ name: title, description: description }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 200) {
    closeAllPopups();
    calculateTasks();
  }
}

let deleteButton = document.querySelector(".delete-btn");
deleteButton.addEventListener("click", async () => {
  await deleteTask(currentID);
  closeAllPopups();
  calculateTasks();
  showConfirmation("Task Deleted Successfully");
});

async function deleteTask(id) {
  let response = await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    document.querySelector(`[data-card-id="${id}"]`).remove();
  }
}

function showConfirmation(message) {
  const notifier = document.querySelector(".task-created-notifier");
  const notifierMessage = document.querySelector("#notifier-message");
  notifierMessage.innerText = message;
  notifier.style.transform = "translateX(0px)";
  const closeBtn = notifier.querySelector(".close-svg-box");
  closeBtn.addEventListener(
    "click",
    () => {
      notifier.style.transform = "translateX(-500px)";
    },
    { once: true }
  );
  setTimeout(() => {
    notifier.style.transform = "translateX(-500px)";
  }, 10000);
}
