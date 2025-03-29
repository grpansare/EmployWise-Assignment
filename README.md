## User Management System
<hr>


## Overview
<hr>

This project is a User Management System that allows authentication, listing users, editing, and deleting users. It utilizes React.js for the frontend and consumes APIs from ReqRes.in for user data management.
 Features

  User Authentication: Users can log in with predefined credentials.

  User List: Displays users in a paginated format.

  Edit Users: Users can update their first name, last name, and email.

Delete Users: Users can be removed from the list.

Success & Error Messages: Uses alerts/snackbars for better UX.

API Endpoints

Login: POST /api/login

Email: eve.holt@reqres.in

Password: cityslicka

Fetch Users: GET /api/users?page=1

Update User: PUT /api/users/{id}

Delete User: DELETE /api/users/{id}

Tech Stack

Frontend: React.js, Material UI

State Management: React Hooks

Routing: React Router

HTTP Requests: Axios

Alerts & Notifications: SweetAlert2, Material UI Snackbar

Installation & Setup

Clone the repository:

git clone https://github.com/your-repo/user-management.git
cd user-management

Install dependencies:

npm install

Start the development server:

npm eun dev

How to Use
Login: Use the given credentials to log in.

User List: Navigate through paginated users.

Edit User: Click Edit, update fields, and save changes.

Delete User: Click Delete to remove a user.

Logout: Click Logout to return to the login page.
