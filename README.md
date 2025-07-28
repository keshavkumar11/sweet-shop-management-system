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

<img width="502" height="835" alt="Folder Structure" src="https://github.com/user-attachments/assets/1145d407-7c65-4376-b5da-5d8b67252760" />


🚀 Getting Started

=> Clone the repository

git clone https://github.com/keshavkumar11/sweet-shop-management-system.git

cd sweet-shop-management-system

=> Backend Setup

cd backend

npm install

Create a .env file:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx


Start server:

npm start

=> Frontend Setup

cd frontend

npm install

npm run dev

🚀 Live URL / Localhost

Visit: http://localhost:5173

📈 Screenshots

Home Page

<img width="1877" height="925" alt="image" src="https://github.com/user-attachments/assets/7010072c-3287-47b8-8f03-8ee47be87451" />


<img width="1874" height="916" alt="image" src="https://github.com/user-attachments/assets/ac98b9bf-b197-48d9-a0a1-4cd18a89e70e" />

Registration Page

<img width="486" height="548" alt="image" src="https://github.com/user-attachments/assets/ac00ddd9-5dab-449a-82cb-da1f4bf76692" />

Login Page

<img width="450" height="400" alt="image" src="https://github.com/user-attachments/assets/048b6fc3-dcc3-43c1-b76e-5ce0d1c1841e" />

Filter Feature

==> By category

<img width="1896" height="908" alt="image" src="https://github.com/user-attachments/assets/7062725e-3539-4b83-ac7e-b0d0272aca28" />

==> By Name

<img width="1701" height="610" alt="image" src="https://github.com/user-attachments/assets/d143dc32-8d72-4da0-a1a1-aa3ae0fe0f98" />

Admin Dashboard

<img width="1820" height="630" alt="image" src="https://github.com/user-attachments/assets/75dfcab7-bae4-4637-a4c6-8c5fbf639204" />

<img width="594" height="449" alt="image" src="https://github.com/user-attachments/assets/3fad48b0-cd5e-442f-8439-935b9f3c86ac" />



🔐 Sample Credentials

<img width="398" height="96" alt="image" src="https://github.com/user-attachments/assets/31880dcd-8484-42c2-87d7-fc1a7fb5b74e" />

🎮 Author

Keshavkumar Purani
MCA Student | Full Stack Developer

📄 License

This project is open-source and MIT licensed.








 




