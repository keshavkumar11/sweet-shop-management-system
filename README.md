Sweet Shop Management System 

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing a sweet shop. Built using TDD (Test-Driven Development) and SOLID principles, this system ensures robust design, clean architecture, and maintainable code. AI tools like ChatGPT were used for learning concepts, planning structure, and refining documentation — not for directly writing production code.

✨ Features

👤 User

Register and login securely

Browse available sweets

Filter by category and search by name

Purchase sweets if available in stock

👩‍💼 Admin

Add sweets with image upload (Cloudinary)

View all products

Update and delete products

Restock existing products

📊 Tech Stack

Frontend : React(Vite), React Router, CSS

Backend : Node.js, Express.js, Mongoose

Database : MongoDB

Other Tools : Cloudinary(upload), JWT(Auth), Supertest (API test)

👥 TDD Approach

I followed the Red → Green → Refactor loop:

Red: Wrote failing test cases first (using Jest)

Green: Wrote minimum logic to pass the tests

Refactor: Improved and cleaned up the code while ensuring tests still passed

All backend services, controllers, and authentication routes were developed with Jest unit tests.

🤖 AI Usage Clarification

🚨 Clarification: I did not use AI to write the actual codebase. Instead, I used AI tools like ChatGPT to:

  Learn new concepts and clarify architecture

  Plan folder structure and SOLID-compliant services

  Design test strategies and handle edge cases

  Guide UI layout thinking under time constraints

  ⚙️ The backend was built with high test coverage using a test-driven approach. On the frontend, my initial focus was functional UI due to time limits. However, I plan to revisit and improve test coverage and feature depth — including Auth enhancements, Email/Push notifications, Payment integration, and Analytics.

  📊 Test Reports

  Testing Framework: Jest (Backend)

  Coverage: 100% for Auth and Product routes

  To run tests:

  cd backend
  npm test -- --coverage

  > backend@1.0.0 test
> jest --coverage

----------------|----------|----------|----------|----------|-------------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------|----------|----------|----------|----------|-------------------|
All files       |    100   |   100    |   100    |   100    |                   |
----------------|----------|----------|----------|----------|-------------------|


📁 Folder Structure

sweet-shop-management-system/
├── backend/
│   ├── controllers/
|   ├── middleware/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── tests/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── App.jsx
│   └── public/

