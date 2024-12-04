# RBAC (Role-Based Access Control) Backend API

This is a backend API that implements Role-Based Access Control (RBAC) for managing user roles and permissions. The API allows admins to register users, assign roles, update permissions, and perform CRUD operations on records. The system has three user roles: **Admin**, **Manager**, and **User**, each with different levels of access.

## Features
- **Admin**: Can create, read, and delete records, update user permissions, and manage all roles.
- **Manager**: Can create and read records but cannot delete them by default. Admin can update their permissions to enable deletion rights.
- **User**: Can only read records. Admin can update their permissions to allow them to create or delete records.


## **Permissions Hierarchy**

### Default Permissions:

- **User**: By default, a **User** cannot create or delete records.
- **Manager**: By default, a **Manager** cannot delete records.

### After Admin Updates Permissions:

- **User**: A **User** can be granted the permission to **create** and **delete** records by the Admin.

- **Manager**: A **Manager** can be granted the permission to **delete** records by the Admin.

---

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

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/rbac-backend.git
cd rbac-backend
```
### 2. Install dependencies

To install the required dependencies for the project, run the following command:

```bash
npm install
```
### 3. Setup environment variables

Create a `.env` file in the root of the project and add the following variables:

```bash
# Port on which the server will run
PORT=3000

# Hostname of the MySQL database (usually localhost)
DB_HOST=localhost

# MySQL database username
DB_USER=root

# Password for your MySQL user
DB_PASSWORD=yourpassword

# Name of the MySQL database to be used
DB_NAME=rbac_db

# Secret key used to sign the JWT tokens
JWT_SECRET=your-secret-key
```
### 4. Start the server

Run the following command to start the server:

```bash
npm start
```
The server will be running on http://localhost:3000.

## API Endpoints

### Admin Endpoints

- **POST /auth/register** - Register as an admin  
  Register a new admin user with a username, password, and role.

- **POST /auth/login** - Admin login  
  Admin user login to authenticate and obtain a JWT token.

- **POST /records** - Create a new record  
  Admin can create a new record with details like firstname, lastname, and email.

- **GET /records** - Read all records  
  Admin can read all the records from the database.

- **DELETE /records/:id** - Delete a record  
  Admin can delete a specific record by providing the record ID in the URL parameter.

- **PUT /auth/permissions/:id** - Update user permissions (Admin only)  
  Admin can update the permissions of any user by changing their access rights (read/write/delete).

---

### Manager Endpoints

- **POST /auth/register** - Register as a manager  
  Register a new manager user with a username, password, and role.

- **POST /auth/login** - Manager login  
  Manager user login to authenticate and obtain a JWT token.

- **POST /records** - Create a new record  
  Manager can create a new record (if they have permission granted by Admin).

- **GET /records** - Read all records  
  Manager can read all the records from the database.

- **DELETE /records/:id** - Delete a record (if permission granted by Admin)  
  Manager can delete a specific record only if permission has been granted by Admin.

---

### User Endpoints

- **POST /auth/register** - Register as a user  
  Register a new user with a username, password, and role.

- **POST /auth/login** - User login  
  User login to authenticate and obtain a JWT token.

- **GET /records** - Read all records  
  User can read all the records available in the database.

- **POST /records** - Create a new record (if permission granted by Admin)  
  User can create a new record only if the Admin has granted them permission.

- **DELETE /records/:id** - Delete a record (if permission granted by Admin)  
  User can delete a specific record only if the Admin has granted them permission.

## Testing

### Postman Collection

To easily test the API endpoints, you can download the Postman collection file and import it into Postman.

#### Import the collection:
1. Open Postman.
2. Click the **"Import"** button located in the top left corner.
3. Select the **"Upload Files"** tab and choose the downloaded Postman collection file.
4. Once imported, you can start testing the API endpoints.

---

### Testing Admin Endpoints
Here is the updated **workflow** as per your request, following the same format and structure:

---

### **Admin Workflow**

1. **Register Admin**
   - **Postman Workspace**: `Admin/AdminRegister`
   - **Request Type**: `POST`
   - **URL**: `/auth/register`
   - **Description**: Register a new admin user with the necessary credentials.
   - **Headers**: None

2. **Login Admin**
   - **Postman Workspace**: `Admin/AdminLogin`
   - **Request Type**: `POST`
   - **URL**: `/auth/login`
   - **Description**: Admin logs in and obtains a JWT token for authentication.
   - **Headers**: None

3. **Create Record**
   - **Postman Workspace**: `Admin/Create Record`
   - **Request Type**: `POST`
   - **URL**: `/records`
   - **Description**: Admin can create a new record.
   - **Headers**:  
     - Authorization: `Bearer {JWT_TOKEN}`

4. **Read Records**
   - **Postman Workspace**: `Admin/Read Records`
   - **Request Type**: `GET`
   - **URL**: `/records`
   - **Description**: Admin can view all the records in the system.
   - **Headers**:  
     - Authorization: `Bearer {JWT_TOKEN}`

5. **Delete Record**
   - **Postman Workspace**: `Admin/Delete Record`
   - **Request Type**: `DELETE`
   - **URL**: `/records/:id`
   - **Description**: Admin can delete a record by providing its ID.
   - **Headers**:  
     - Authorization: `Bearer {JWT_TOKEN}`

6. **Update User Permissions** (In case any user needs to create, delete, or manage records)
   - **Postman Workspace**: `Admin/Update User Permissions`
   - **Request Type**: `PUT`
   - **URL**: `/auth/permissions/:id`
   - **Description**: Admin can update user permissions (e.g., allowing creation or deletion of records).
   - **Headers**:  
     - Authorization: `Bearer {JWT_TOKEN}`

---

### **Manager Workflow**

1. **Register Manager**
   - **Postman Workspace**: `Manager/ManagerRegister`
   - **Request Type**: `POST`
   - **URL**: `/auth/register`
   - **Description**: Register a new manager user.
   - **Headers**: None

2. **Login Manager**
   - **Postman Workspace**: `Manager/ManagerLogin`
   - **Request Type**: `POST`
   - **URL**: `/auth/login`
   - **Description**: Manager logs in and gets a JWT token for authentication.
   - **Headers**: None

3. **Create Record**
   - **Postman Workspace**: `Manager/Create Record`
   - **Request Type**: `POST`
   - **URL**: `/records`
   - **Description**: Manager can create a new record.
   - **Headers**:  
     - Authorization: `Bearer {JWT_TOKEN}`

4. **Read Records**
   - **Postman Workspace**: `Manager/Read Records`
   - **Request Type**: `GET`
   - **URL**: `/records`
   - **Description**: Manager can view all records in the system.
   - **Headers**:  
     - Authorization: `Bearer {JWT_TOKEN}`

5. **Delete Record** (If manager has been given permission by Admin)
   - **Postman Workspace**: `Manager/Delete Record`
   - **Request Type**: `DELETE`
   - **URL**: `/records/:id`
   - **Description**: Manager can delete a record, but only if the Admin has updated their permissions.
   - **Solution**: If the manager does not have delete permissions, navigate to the **Admin's Update User Permissions** route and allow the manager to have delete permissions.
   - **Headers**:  
     - Authorization: `Bearer {JWT_TOKEN}`

---

### **User Workflow**

1. **Register User**
   - **Postman Workspace**: `User/UserRegister`
   - **Request Type**: `POST`
   - **URL**: `/auth/register`
   - **Description**: Register a new user in the system.
   - **Headers**: None

2. **Login User**
   - **Postman Workspace**: `User/UserLogin`
   - **Request Type**: `POST`
   - **URL**: `/auth/login`
   - **Description**: User logs in and gets a JWT token for authentication.
   - **Headers**: None

3. **Read Records**
   - **Postman Workspace**: `User/Read Records`
   - **Request Type**: `GET`
   - **URL**: `/records`
   - **Description**: User can view all records in the system.
   - **Headers**:  
     - Authorization: `Bearer {JWT_TOKEN}`

4. **Create Record** (If user has been given permission by Admin)
   - **Postman Workspace**: `User/Create Record`
   - **Request Type**: `POST`
   - **URL**: `/records`
   - **Description**: User can create a record, but only if Admin has updated their permissions.
   - **Solution**: If the user does not have create permissions, navigate to the **Admin's Update User Permissions** route and allow the user to have create permissions.
   - **Headers**:  
     - Authorization: `Bearer {JWT_TOKEN}`

5. **Delete Record** (If user has been given permission by Admin)
   - **Postman Workspace**: `User/Delete Record`
   - **Request Type**: `DELETE`
   - **URL**: `/records/:id`
   - **Description**: User can delete a record, but only if Admin has updated their permissions.
   - **Solution**: If the user does not have delete permissions, navigate to the **Admin's Update User Permissions** route and allow the user to have delete permissions.
   - **Headers**:  
     - Authorization: `Bearer {JWT_TOKEN}`

---

