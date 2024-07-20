# DealsDray

## Overview

DealsDray is a MERN (MongoDB, Express.js, React.js, Node.js) application designed to manage employee information with a focus on user authentication and a comprehensive admin dashboard. This project incorporates features for managing employee records, searching, sorting, and pagination, along with a responsive user interface styled using Bootstrap and Material-UI.

## Features

- **User Authentication**: Login functionality with server-side and client-side validation. Admin credentials are managed using local storage or cookies.
- **Admin Dashboard**: A central dashboard with navigation links to employee management and user details.
- **Employee Management**:
  - **Employee List**: Display employee details with options to create, edit, and delete entries. Includes search, filter, pagination, sorting, and status management.
  - **Create Employee**: Form to add new employee records with validations for email format, numeric fields, and file upload constraints (jpg/png).
  - **Edit Employee**: Form to update existing employee details with similar validations as the create form.
- **Responsive Design**: Utilizes Bootstrap and Material-UI for styling and layout.

## Technologies

- **Frontend**:
  - React
  - Bootstrap
  - Material-UI
  - React Router
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB

## Installation

### Prerequisites

- Node.js
- MongoDB

### Clone the Repository

```
git clone https://github.com/anjangujjar/DealsDray.git
cd DealsDray
```
###Frontend Setup
Navigate to the frontend directory:

```
cd frontend
```
Install dependencies:
```
npm install
```
Start the development server:

```
npm start
```
The frontend application will run on port 3000.

Backend Setup
Navigate to the backend directory:

```
cd backend
```
Install dependencies:

```
npm install
```
Start the server:

```
npm start
```
Note: Restart the server for every change made to the backend code.

## Usage

- **Login**: Access the login page and authenticate using admin credentials.
- **Dashboard**: Use the navbar to navigate between Home, Employee List, and other sections.
- **Employee Management**:
  - **Employee List**: View and manage employee records. Utilize search, sorting, and filtering functionalities.
  - **Create Employee**: Fill out the form to add a new employee.
  - **Edit Employee**: Modify existing employee records.

## Development Notes

- **Local Storage**: Used for managing authentication tokens and admin details.
- **React Router**: Manages routing between different components/pages.
- **Styling**: Ensure components are styled according to the project requirements.

## Future Enhancements

- Implement a separate page/component for editing employee details.
- Update the navbar and logo in the Employee List to improve consistency and design.

## Contributing

Feel free to fork the repository and submit pull requests. For any issues or feature requests, please open an issue on the [GitHub repository](https://github.com/anjangujjar/DealsDray/issues).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
