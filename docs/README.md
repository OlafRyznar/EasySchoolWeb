# EasySchool

Welcome to the documentation for EasySchool, a web-based application designed to facilitate school administration, communication, and student progress monitoring.

## Overview

EasySchool consists of a React frontend, a PHP backend (version 8) with an MVC architecture, and a MySQL database. The system includes an API for communication between the frontend and backend.

## Features

- **User Roles**: Teacher, Student, Parent
- **Sections**:
  - [For Teacher](./teacher.md)
  - [For Student](./student.md)
  - [For Parent](./parent.md)
  - [Other](./other.md)
- **Login & Registration**: Allows users to log in or create a new account.
- **Password Security**: Passwords are encrypted for secure storage.
- **Messaging**: Users can send messages to each other within the system.
- **Grades Management**: Teachers can add and manage grades for students.
- **Fees Management**: Parents can check any outstanding dues or fees.
- **Exams Management**: Teachers can create and manage exams.
- **Schedule Management**: Users can view their own schedule as well as the schedule of other classes.

## Main Page

Upon entering the site, you will see four main sections:
- [For Teacher](./teacher.md)
- [For Student](./student.md)
- [For Parent](./parent.md)
- [Other](./other.md)

In the top-left corner, there is a login button for users who already have an account. If you don't have an account, you can create one by navigating to:
- **Other -> Create Account** or
- **From the main page -> Login -> Create Account**

## API

The application includes an API for communication between the frontend and backend. Please refer to the API documentation for more details on the available endpoints and data formats.

## Frontend

The frontend is built with React and includes components for each of the main sections of the application. The design is responsive and optimized for various devices.

## Backend

The backend is implemented using PHP 8 and follows the MVC (Model-View-Controller) architecture. It handles business logic, data storage, and interaction with the frontend.

## Database

The database is powered by MySQL, storing all data related to users, exams, schedules, and more.
