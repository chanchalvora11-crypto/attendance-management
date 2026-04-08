# Attendance Management System

A modern, responsive web-based attendance management application built with Angular. This system enables efficient tracking and management of attendance records and leave workflows for educational institutions or organizations.

## Table of Contents

- Overview
- Features
- Tech Stack
- Prerequisites
- Installation
- Development
- Building for Production
- Testing
- Project Structure
- Code Scaffolding
- Configuration
- Challenges Faced

## Overview

The Attendance Management System is a lightweight and user-friendly application designed to streamline the process of recording, tracking, and managing attendance and leave requests.
This project was developed as part of coursework (CIA 3) and later improved by fixing multiple Angular configuration issues, routing bugs, and UI inconsistencies.

It demonstrates practical implementation of Angular concepts such as routing, modular architecture, form validation, and API integration.

This application is suitable for:
- Educational institutions (schools, colleges, universities)
- Corporate organizations
- Training centers and workshops
- Any entity requiring centralized attendance tracking

## Features

### Functional Features

- Employee Management (Add, view, and manage employee data)
- Attendance Tracking (Mark and monitor attendance records)
- Leave Request System (Submit leave requests)
- Leave Approval Workflow (Approve or reject requests)
- Dashboard (Overview of attendance and leave activity)

---

### Technical Features

- Angular Routing with Guards
- Reactive Forms with Validation
- Modular Component Architecture
- Angular Material UI Integration
- REST-based mock backend using JSON Server
- Real-time UI updates using Angular data binding
- CRUD operations for data handling

---

## Tech Stack

The project uses modern web technologies:

| Technology        | Purpose                        | Version |
|------------------|--------------------------------|--------|
| Angular          | Frontend Framework             | 20.x   |
| TypeScript       | Programming Language           | Latest |
| SCSS             | Styling                        | -      |
| HTML5            | Markup                         | -      |
| Angular CLI      | Development & Build Tool       | 20.x   |
| JSON Server      | Mock Backend API               | -      |

---

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.x or higher recommended)
- npm (v9.x or higher)
- Angular CLI
- A modern web browser

### Verify Installation

```bash
node --version
npm --version
ng version
````

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/chanchalvora11-crypto/attendance-management.git
cd attendance-management
```

### Install Dependencies

```bash
npm install
```

---

## Development

### Start Development Server

```bash
ng serve
```

or

```bash
npm start
```

### Access the Application

```
http://localhost:4200/
```

### Development Workflow

* Make changes in the `src/` directory
* The application reloads automatically
* Check console for errors
* Use Angular DevTools for debugging

---

## Building for Production

To build the project for production:

```bash
ng build --configuration production
```

### Build Output

* Stored in the `dist/` folder
* Optimized for:

  * Performance (minification)
  * Speed (tree-shaking)
  * Reduced bundle size

---

## Testing

### Unit Testing

```bash
ng test
```

### Code Coverage

```bash
ng test --code-coverage
```

---

## Project Structure

```
attendance-management/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   ├── guards/
│   │   └── app.module.ts
│   ├── assets/
│   ├── styles/
│   └── environments/
├── public/
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## Code Scaffolding

Angular CLI provides tools to generate components and services:

```bash
ng generate component component-name
ng generate service service-name
ng generate module module-name
```

---

## Configuration

### Angular Configuration

Defined in `angular.json`, including:

* Build settings
* Assets
* Styles
* Entry points

---

### Environment Configuration

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

---

## Challenges Faced

During development, several real-world issues were encountered and resolved:

* Angular configuration errors (Zone.js, builder issues)
* Routing issues causing blank or unresponsive pages
* Dependency conflicts between Angular versions
* Template binding and module import errors
* Debugging UI rendering issues

---

## Future Improvements

* Authentication and Login system
* Role-based access control
* Advanced dashboard analytics
* Backend integration (Node.js / Firebase)
* Improved mobile responsiveness

---

## Author

**Chanchal Vora**
B.Tech IT Student
Frontend Developer

---

## ⭐ Note

This project reflects practical experience with Angular development, debugging, and building structured frontend applications.

If you find it useful, consider giving it a ⭐ on GitHub.
