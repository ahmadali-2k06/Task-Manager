hi# 📌 Task Manager – Node.js + Express + MongoDB

This project is a **Task Management Application** built with **Node.js, Express, MongoDB, and EJS**. It allows users to create, update, delete, and categorize tasks into stages such as **To Do, In Progress, and Done**.

It also demonstrates **clean backend architecture** with controllers, routes, middlewares, and custom error handling.

---

## 🚀 Features

* Create, Read, Update, Delete (CRUD) tasks
* Update task stage (To Do, In Progress, Done)
* Centralized error handling with a custom error class
* Async wrapper middleware (removes repetitive `try/catch`)
* View rendering with **EJS**
* Static files for frontend (CSS & JS)

---

## 📂 Folder Structure

```
TASK MANAGER
│── .vscode/              → VS Code settings (optional)
│
│── controllers/          → Controller functions for tasks
│   └── tasks.js
│
│── db/                   → Database connection
│   └── connect.js
│
│── errors/               → Custom error classes
│   └── customError.js
│
│── middlewares/          → Middlewares for error handling & async wrapper
│   ├── 404.js
│   ├── async-wrapper.js
│   └── errorHandler.js
│
│── models/               → Mongoose models
│   └── Task.js
│
│── node_modules/         → Installed dependencies (ignored by Git)
│
│── public/               → Static frontend files
│   ├── script.js
│   └── style.css
│
│── routes/               → Express route handlers
│   ├── home.js
│   └── tasks.js
│
│── views/                → EJS templates
│   └── index.ejs
│
│── .env                  → Environment variables (DB URI, PORT, etc.)
│── .gitignore            → Git ignored files/folders
│── app.js                → Entry point of the application
│── package.json          → Dependencies and scripts
│── package-lock.json     → Lock file for dependencies
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/ahmadali-2k06/task-manager.git
cd task-manager
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file in the root directory and add:

```bash
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Run the server

```bash
npm start
```

OR with nodemon (if installed):

```bash
npx nodemon app.js
```

---

## 🧪 Testing the Project

### API Testing (using Postman / Thunder Client)

* **Get all tasks**

  ```http
  GET http://localhost:5000/api/v1/tasks
  ```

* **Get single task**

  ```http
  GET http://localhost:5000/api/v1/tasks/:id
  ```

* **Create task**

  ```http
  POST http://localhost:5000/api/v1/tasks
  Content-Type: application/json
  {
    "name": "Learn Node.js",
    "description": "Finish async wrapper lesson"
  }
  ```

* **Update task**

  ```http
  PUT http://localhost:5000/api/v1/tasks/:id
  Content-Type: application/json
  {
    "name": "Learn Express",
    "description": "Practice error handling"
  }
  ```

* **Update task stage**

  ```http
  PATCH http://localhost:5000/api/v1/tasks/:id
  Content-Type: application/json
  {
    "stage": "In Progress"
  }
  ```

* **Delete task**

  ```http
  DELETE http://localhost:5000/api/v1/tasks/:id
  ```

### Browser Testing

Run the app and open:

```
http://localhost:5000/
```

This will render the **EJS frontend** with tasks grouped into:

* To Do
* In Progress
* Done

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express
* **Database:** MongoDB + Mongoose
* **Frontend:** EJS, CSS, JavaScript
* **Error Handling:** Custom Error Middleware + Async Wrapper

