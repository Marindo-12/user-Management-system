# User Management System

A clean, modular **Vanilla JavaScript CRUD application** for managing users in the browser.  
The project demonstrates object-oriented structure, form validation, table rendering, and persistence with `localStorage`.

## Overview

This web app lets you:
- Add users from a form (`name`, `email`, `age`)
- Display users in a dynamic table
- Edit existing users
- Delete users with a confirmation dialog
- Persist data in the browser (`localStorage`)
- Bootstrap initial data from `data.json` when storage is empty
- Show toast notifications for user actions

## Tech Stack

- HTML5 (`Object.html`)
- CSS3 (`styles.css`)
- JavaScript ES Modules (`src/`)
- Browser `localStorage` for persistence

## Project Structure

```text
user-Management-system/
  Object.html
  styles.css
  data.json
  src/
    main.js
    models/
      User.js
      UserManager.js
    ui/
      UIManager.js
      Toast.js
    services/
      api.js
      storage.js
    utils/
      errors.js
  Images/
    (project screenshots)
```

## How It Works

1. On load, `src/main.js` initializes `UserManager`.
2. If no users are stored, the app loads starter users from `data.json`.
3. `UIManager` handles form submission, edit/delete actions, and table rendering.
4. `UserManager` applies business logic and persists updates in `localStorage`.
5. Toast messages provide feedback for add/edit/delete operations.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Marindo-12/user-Management-system
cd user-Management-system
```

### 2. Run the app

Use any local static server (recommended for module loading), for example:

```bash
# VS Code Live Server
# Open Object.html with Live Server
```

Then access the app in your browser (example: `http://127.0.0.1:5501/Object.html`).

## Screenshots (UI Walkthrough)

### Main interface: form + users table

![Main interface](Images/Screenshot%202025-11-07%20225216.png)

### Adding a user: filled form

![Filled form before add](Images/Screenshot%202025-11-07%20225313.png)

### Added user appears in table actions area

![Added user row with actions](Images/Screenshot%202025-11-07%20225339.png)

### Add success feedback toast

![Add success toast](Images/Screenshot%202025-11-07%20225301.png)

### Edit mode activated

![Edit mode toast](Images/Screenshot%202025-11-07%20225428.png)

### Update success feedback

![Update success toast](Images/Screenshot%202025-11-07%20225402.png)

### Delete confirmation dialog

![Delete confirmation dialog](Images/Screenshot%202025-11-07%20225441.png)

### Delete success feedback

![Delete success toast](Images/Screenshot%202025-11-07%20225450.png)

## Key Learning Points

- Modular JS architecture with separated responsibilities
- Encapsulation using classes (`User`, `UserManager`, `UIManager`)
- Client-side validation and feedback patterns
- Persistent UI state with browser storage

## Author

Mini project for practicing front-end architecture and CRUD workflows in JavaScript.
