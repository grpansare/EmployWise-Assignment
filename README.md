<h1>User Management System</h1>
<hr>


<h3>Overview</h3>
<hr>

This project is a User Management System that allows authentication, listing users, editing, and deleting users. It utilizes React.js for the frontend and consumes APIs from ReqRes.in for user data management.
<h3><b> Features</b></h3>
<hr>

  <li>User Authentication: Users can log in with predefined credentials.</li>

   <li>User List: Displays users in a paginated format.</li>

   <li>Edit Users: Users can update their first name, last name, and email.<li/>

 <li>Delete Users: Users can be removed from the list.</li>

<li>Success & Error Messages: Uses alerts/snackbars for better UX.</li>

<h3><b>API Endpoints</b></h3>

<li>Login: POST /api/login</li>

<li>Email: eve.holt@reqres.in</li>

<li>Password: cityslicka</li>

<li>Fetch Users: GET /api/users?page=1</li>

<li>Update User: PUT /api/users/{id}</li>

<li>Delete User: DELETE /api/users/{id}</li>

<h3><b>Tech Stack</b></h3>

Frontend: React.js, Material UI

State Management: React Hooks

Routing: React Router

HTTP Requests: Axios

Alerts & Notifications: SweetAlert2, Material UI Snackbar

<h3><b>Installation & Setup</b></h3>
<hr>
Clone the repository:

git clone https://github.com/your-repo/user-management.git
<br>
cd user-management
<br>
<b>Install dependencies:</b>
<hr>
npm install
<br>
<b>Start the development server:</b>
<br>

npm eun dev
<br>
<b>How to Use</b>
<hr>
<ul>
  <li><b>Login:</b> Use the given credentials to log in.</li>
  <li><b>User List:</b> Navigate through paginated users.</li>
  <li><b>Edit User:</b> Click <b>Edit</b>, update fields, and save changes.</li>
  <li><b>Delete User:</b> Click <b>Delete</b> to remove a user.</li>
  <li><b>Logout:</b> Click <b>Logout</b> to return to the login page.</li>
</ul>

