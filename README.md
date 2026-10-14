**TITLE:** Academic Management System - Software Architecture

**DESCRIPTION:**

Full-stack web platform for the administration of university entities. This project was developed as a Software Architecture practice implementing a modular monolith pattern. It allows student registration, course creation with instructor assignment, and enrollment management, preventing overlaps and duplicates.

**AUTHORS:**

Edith Chuico and Freddy Jimenez

**TECHNOLOGIES USED:**

Frontend: React, TypeScript, Vite, Apollo Client

Backend: NestJS, TypeScript, Apollo Server, GraphQL

Database: MySQL

**PREREQUISITES:**

- Have Node.js installed.
- Have an active MySQL server (XAMPP, WAMP, or MySQL Workbench).

**INSTALLATION INSTRUCTIONS:**

**Step 1:** Clone this repository to your local machine.

**Step 2:** Open your MySQL database manager and create a completely empty database. You can name it whatever you want (for example: academic\_system).

**Step 3:** Update the database credentials (username, password, and the database name you just created) in the backend configuration file (e.g., in the .env file or app.module.ts).

**Step 4:** Open a terminal in the backend folder, run "npm install" and then "npm run start:dev". NestJS will automatically connect to MySQL and build all the necessary tables.

**Step 5:** Open a new terminal in the frontend folder, run "npm install" and then "npm run dev".

**Step 6:** Open the local link provided by the frontend terminal (usually http://localhost:5173) in your web browser.
