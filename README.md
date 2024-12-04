2. Install dependencies
To install the required dependencies for the project, run the following command in the project directory:

bash
Copy code
npm install
This will install all the dependencies listed in the package.json file.

3. Setup environment variables
Create a .env file in the root of the project and add the following variables:

bash
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
