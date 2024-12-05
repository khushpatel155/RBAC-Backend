# RBAC (Role-Based Access Control)

This is a backend project that implements Role-Based Access Control (RBAC) for managing user roles and permissions. This allows admins to register users, assign roles, update permissions, and perform CRUD operations on records. The system has three user roles: **Admin**, **Manager**, and **User**, each with different levels of access.

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

### Resources:
- **Records**: Admins, Managers, and Users can perform actions on records (create, read, update, delete).
- **Permissions**: Three permission levels available for each resource:
  - `0`: Read access
  - `1`: Read and Write access
  - `2`: Read,Write and Delete access

## Table of Contents
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Authentication](#authentication)
- [Testing](#testing-in-postman)
- [Run the Project](#run-the-project)
  

## Tech Stack

- **Node.js**
- **Express.js**
- **JWT**
- **MySQL**
- **Postman**

---

## Setup Instructions

### 1. Clone the repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/khushpatel155/RBAC-Backend
cd RBAC-Backend
```
### 2. Install dependencies

To install the required dependencies for the project, run the following command:

```bash
npm install
```
### 3. Setup environment variables

Create a `.env` file in the root of the project and add the following variables:

```bash
PORT=3000    # Port on which the server will run
DB_HOST=localhost  # Hostname of the MySQL database (usually localhost)
DB_USER=root  # MySQL database username
DB_PASSWORD=yourpassword  # Password for your MySQL user
DB_NAME=rbac # Name of the MySQL database to be used
JWT_SECRET=your-secret-key  # Secret key used to sign the JWT tokens
JWT_EXPIRES_IN=1h  # Time after token will ne expire
```
### 4. Start the server

Run the following command to start the server:

```bash
npm start
```
The server will be running on http://localhost:3000.

---

## Authentication

JWT tokens are used for authentication. After successful login, you will receive a JWT token, which should be included in the `Authorization` header of subsequent requests.

Example:

```bash
Authorization: Bearer {JWT_TOKEN}
```

---

## Testing

### Postman Collection

To easily test the API endpoints, you can download the Postman collection file : "RBAC.postman_collection.json" and import it into Postman.

#### Import the collection:
1. Open Postman.
2. Click the **"Import"** button located in the top left corner.
3. Select the **"Upload Files"** tab and choose the downloaded Postman collection file.
4. Once imported, you can start testing the API endpoints.



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

## Run the Project

1. Clone the repository using the link above.
2. Install the dependencies using `npm install`.
3. Set up your `.env` file with the correct MySQL connection settings.
4. Run the server using `npm start`.
5. Use Postman or any other API testing tool to test the endpoints.

---



