# API Documentation

---

## **Project Setup**

### **1. Prerequisites**

Before setting up the project, make sure you have the following installed on your machine:

- **Node.js** (v14 or above)
- **PostgreSQL** (Ensure it's running and accessible)
- **Git** (optional, for cloning the repository)

1. Navigate to the project directory and install all necessary Node.js packages: 
command: npm install

### **3. Environment Configuration**

Create a `.env` file in the root directory of your project to store environment variables.   the following template and replace the placeholder values with your actual configuration:

```
dotenv  code
DATABASE_URL="postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE"
ACCESS_TOKEN_SECRET=your_secret_key
PORT=3000

```

### **4. Database Setup**

Ensure PostgreSQL is running, and the database specified in the `DATABASE_URL` exists. You can create the database manually via a PostgreSQL client or command line:

```bash
bash  code
createdb mydb

```

### **5. Run Prisma Migrations**

Run the following command to migrate your Prisma schema to the PostgreSQL database:

```bash
bash  code
npx prisma migrate dev

```

### **6. Seed the Database**

To seed the database with initial data, run the seeding script:

```bash
bash  code
node seed.js

```

### **7. Start the Server**

Start your Express server:

```bash
bash  code
npm start

```

# APIS

Authentication APIs

1. Register a New User
Endpoint: POST /register
Description: Registers a new user with a name, phone number, optional email, and password.
Request Body:
json
  code
{
"name": "John Doe",
"phone": "1234567890",
"email": "[john.doe@example.com](mailto:john.doe@example.com)",
"password": "yourpassword"
}
Response:
json
  code
{
"message": "User registered successfully"
}
2. User Login
Endpoint: POST /login
Description: Logs in an existing user using phone number and password.
Request Body:
json
  code
{
"phone": "1234567890",
"password": "yourpassword"
}
Response:
json
  code
{
"accessToken": "your_jwt_token"
}
Spam Management APIs
3. Mark a Number as Spam
Endpoint: POST /spam
Description: Marks a phone number as spam.
Headers:
makefile
  code
Authorization: Bearer <accessToken>
Request Body:
json
  code
{
"phone": "0987654321"
}
Response:
json
  code
{
"message": "Number marked as spam"
}
Search APIs
4. Search for a Person by Name
Endpoint: GET /search/name/:name
Description: Searches for users by name in the global database.
Headers:
makefile
  code
Authorization: Bearer <accessToken>
Example URL: [http://localhost:3000/search/name/Susan Ebert](http://localhost:3000/search/name/Susan%20Ebert)
Response:
json
  code
[
{
"id": 1,
"name": "Susan Ebert",
"phone": "1234567890",
"spamLikelihood": 2
}
]
5. Search for a Person by Phone
Endpoint: GET /search/phone/:phone
Description: Searches for users by phone number in the global database.
Headers:
makefile
  code
Authorization: Bearer <accessToken>
Example URL: [http://localhost:3000/search/phone/1234567890](http://localhost:3000/search/phone/1234567890)
Response:
json
  code
[
{
"id": 1,
"name": "Susan Ebert",
"phone": "1234567890",
"spamLikelihood": 2
}
]
Testing and Validation
Using Postman
Install Postman: If you haven't already, download and install Postman.

Create a New Collection: This helps organize your requests.

Add Requests:

For each endpoint, create a new request.
Set the appropriate HTTP method (e.g., POST, GET).
Set the request URL (e.g., [http://localhost:3000/register](http://localhost:3000/register)).
Add any required headers (e.g., Authorization for protected routes).
Provide the request body in JSON format for POST requests.

## **Utilities**

### **Phone Number Validation**

A utility function named `validatePhoneNumber` has been implemented to ensure the phone number format is valid. It checks for a basic pattern and ensures consistency across your application. This utility is stored in the `utils` folder.

### **Example Usage in Controllers**

```jsx

const { validatePhoneNumber } = require('../utils/validatePhoneNumber');

if (!validatePhoneNumber(phone)) {
  return res.status(400).json({ error: 'Invalid phone number format' });
}

```

This documentation should help you and other developers understand how to set up and use your application effectively. Ensure to keep it updated as the project evolves.
