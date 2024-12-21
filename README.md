Expense Tracker
Description:-
The Expense Tracker is a simple web application built using Node.js, Express.js, and MongoDB.
It allows users to manage their personal expenses by adding, viewing, updating, and deleting expenses securely. 
The application includes authentication using JWT to ensure data security.

Features:-
User registration and login with secure password hashing.
JWT-based authentication.
Add, view, update, and delete expenses.
MongoDB for data storage.
API endpoints for CRUD operations.
Tech Stack
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
Environment Variables: dotenv

Setup Instructions

1. Clone the Repository
   
git clone https://github.com/your-username/expense-tracker.git
cd my expenses

3. Install Dependencies
   
npm install

5. Configure Environment Variables
Create a .env file in the root directory and add the following:

makefile

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>
JWT_SECRET=your_jwt_secret
PORT=5000
4. Start the Application

npm start
