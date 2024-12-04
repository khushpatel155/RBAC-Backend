# RBAC (Role-Based Access Control) Backend API

This is a backend API that implements Role-Based Access Control (RBAC) for managing user roles and permissions. The API allows admins to register users, assign roles, update permissions, and perform CRUD operations on records. The system has three user roles: **Admin**, **Manager**, and **User**, each with different levels of access.

## Features
- **Admin**: Can create, read, and delete records, update user permissions, and manage all roles.
- **Manager**: Can create and read records but cannot delete them by default. Admin can update their permissions to enable deletion rights.
- **User**: Can only read records. Admin can update their permissions to allow them to create or delete records.

### Resources:
- **Records**: Admins, Managers, and Users can perform actions on records (create, read, update, delete).
- **Permissions**: Three permission levels available for each resource:
  - `0`: No access
  - `1`: Read access
  - `2`: Read and write access (create, update, delete)

## Table of Contents
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Testing in Postman](#testing-in-postman)
- [Permissions Hierarchy](#permissions-hierarchy)
- [Authentication](#authentication)
- [Run the Project](#run-the-project)

---

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **JWT**: JSON Web Token for authentication
- **MySQL**: Relational database for storing user data and records
- **Postman**: API testing tool

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/rbac-backend.git
cd rbac-backend

### 2. Install dependencies
bash
Copy code
npm install
This command will install all the required dependencies listed in package.json.
3. Setup environment variables
Create a .env file in the root of the project and add the following variables:

env
Copy code
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=rbac_db
JWT_SECRET=your-secret-key
PORT: The port on which the server will run.
DB_HOST: The hostname of the MySQL database (usually localhost).
DB_USER: The MySQL database username.
DB_PASSWORD: The password for your MySQL user.
DB_NAME: The name of the MySQL database to be used.
JWT_SECRET: Secret key used to sign the JWT tokens.
4. Setup the MySQL Database
Run the following SQL commands to create the necessary tables in your MySQL database:

sql
Copy code
CREATE DATABASE rbac_db;

USE rbac_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'user') NOT NULL,
  permissions JSON NOT NULL
);

CREATE TABLE records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);
5. Start the server
bash
Copy code
npm start
The server will be running on http://localhost:3000.

API Endpoints
Admin Endpoints
POST /auth/register - Register as an admin.
POST /auth/login - Admin login.
POST /records - Create a new record.
GET /records - Read all records.
DELETE /records/:id - Delete a record.
PUT /auth/permissions/:id - Update user permissions (Admin only).
Manager Endpoints
POST /auth/register - Register as a manager.
POST /auth/login - Manager login.
POST /records - Create a new record.
GET /records - Read all records.
DELETE /records/:id - Delete a record (if permission granted by Admin).
User Endpoints
POST /auth/register - Register as a user.
POST /auth/login - User login.
GET /records - Read all records.
POST /records - Create a new record (if permission granted by Admin).
DELETE /records/:id - Delete a record (if permission granted by Admin).
Testing in Postman
Download and Import Postman Collection
To easily test the API endpoints, you can download the Postman collection file and import it into Postman.

Download the Postman collection file from the link provided: RBAC Postman Collection.
Import the collection into Postman:
Open Postman.
Click on the "Import" button in the top left corner.
Select the "Upload Files" tab and choose the downloaded collection file.
Start testing the API endpoints by following the instructions below.
Admin Testing
Admin Register
Navigate to: POST /auth/register (in Admin folder)
Request Body:
json
Copy code
{
  "username": "adminUser",
  "password": "adminPass",
  "role": "admin"
}
Headers: None
Admin Login
Navigate to: POST /auth/login (in Admin folder)
Request Body:
json
Copy code
{
  "username": "adminUser",
  "password": "adminPass"
}
Response: A JWT token will be returned. Copy this token for use in subsequent requests.
Headers:
Authorization: Bearer {JWT_TOKEN}
Create Record
Navigate to: POST /records (in Admin folder)
Request Body:
json
Copy code
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com"
}
Read Records
Navigate to: GET /records (in Admin folder)
Delete Record
Navigate to: DELETE /records/:id
Request Params: Provide the record ID to delete.
Update User Permissions
Navigate to: PUT /auth/permissions/:id
Request Body:
json
Copy code
{
  "permissions": {
    "create": true,
    "delete": true
  }
}
Manager Testing
Manager Register
Navigate to: POST /auth/register (in Manager folder)
Request Body:
json
Copy code
{
  "username": "managerUser",
  "password": "managerPass",
  "role": "manager"
}
Manager Login
Navigate to: POST /auth/login
Request Body:
json
Copy code
{
  "username": "managerUser",
  "password": "managerPass"
}
Create Record
Navigate to: POST /records (in Manager folder)
Request Body:
json
Copy code
{
  "firstname": "Jane",
  "lastname": "Doe",
  "email": "jane.doe@example.com"
}
Read Records
Navigate to: GET /records (in Manager folder)
Delete Record
Navigate to: DELETE /records/:id (in Manager folder)
User Testing
User Register
Navigate to: POST /auth/register (in User folder)
Request Body:
json
Copy code
{
  "username": "user1",
  "password": "userPass",
  "role": "user"
}
User Login
Navigate to: POST /auth/login
Request Body:
json
Copy code
{
  "username": "user1",
  "password": "userPass"
}
Read Records
Navigate to: GET /records (in User folder)
Create Record
This operation will fail unless the Admin updates the user's permissions to allow record creation.
Delete Record
This operation will fail unless the Admin updates the user's permissions to allow record deletion.
Permissions Hierarchy
By default:
A User cannot create or delete records.
A Manager cannot delete records.
After Admin updates permissions:
A User can be granted the permission to create and delete records.
A Manager can be granted the permission to delete records. 
