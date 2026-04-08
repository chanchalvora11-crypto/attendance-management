🚀Employee Attendance and Leave Management System

A modern, responsive, and scalable web-based Attendance and Leave Management System built using Angular 20. This application enables efficient tracking, management, and reporting of employee attendance and leave workflows for organizations and institutions.

📑 Table of Contents

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
- Future Enhancements

📌 Overview

The Employee Attendance and Leave Management System is a lightweight and user-friendly web application designed to streamline attendance tracking and leave management processes.

Developed as part of academic coursework (CIA 3), this project demonstrates real-world application of Angular concepts including routing, modular architecture, form validation, and UI integration.

This system is suitable for:

- Educational institutions (schools, colleges, universities)
- Corporate organizations
- Training centers and workshops
- Any organization requiring centralized attendance tracking

 ✨ Features

Core Functionalities
- 👩‍💼 Employee Management System
- 📅 Attendance Tracking and Recording
- 📝 Leave Request Submission
- ✅ Leave Approval and Rejection System
- 📊 Dashboard for Overview and Insights

Technical Features
- 🔄 Routing with Angular Guards
- 🔐 Form Validation and Error Handling
- 📱 Fully Responsive UI (Desktop + Mobile)
- ⚡ Real-time Updates with Angular Data Binding
- 🗂️ CRUD Operations for Data Management
- 🎨 UI built with Angular Material

🛠️ Tech Stack

| Technology        | Purpose                        | Version |
|------------------|--------------------------------|--------|
| Angular          | Frontend Framework             | 20.x   |
| TypeScript       | Programming Language           | Latest |
| HTML5            | Markup                         | -      |
| SCSS / CSS       | Styling                        | -      |
| Angular CLI      | Development & Build Tool       | 20.x   |
| JSON Server      | Mock Backend API               | -      |

📊 Language Distribution

- TypeScript: ~65–70%
- SCSS: ~15%
- HTML: ~10–12%
- CSS: ~5–8%

⚙️ Prerequisites

Ensure the following tools are installed:

- Node.js (v18.x or higher recommended)
- npm (v9.x or higher)
- Angular CLI (v20.x)
- A modern browser (Chrome, Firefox, Edge)

Verify Installation:


📦 Installation
1. Clone the Repository
Bash

git clone https://github.com/ChanchalVora/attendance-management.git
cd attendance-management


2. Install Dependencies
Bash

npm install


💻 Development
Start Development Server
Bash

ng serve
or

Bash

npm start
Access Application

http://localhost:4200
Development Workflow
Modify code inside src/

Browser auto-refreshes on changes

Check console for errors

Use Angular DevTools for debugging

⚡ Hot Module Replacement (HMR)
Changes reflect instantly without full reload, improving development speed and efficiency.

🏗️ Building for Production
Build Application
Bash

ng build
Optimized Build
Bash

ng build --configuration production
Build Output
Stored in dist/

Optimized for:

Performance (minification)

Speed (tree-shaking)

Reduced bundle size

🧪 Testing
Unit Testing
Bash

ng test
Code Coverage
Bash

ng test --code-coverage
End-to-End Testing
Bash

ng e2e
Supported frameworks:

Cypress

Playwright

📁 Project Structure

attendance-management/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   ├── guards/
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   └── styles/
├── public/
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
⚙️ Code Scaffolding
Generate Angular components and services:
⚙️ Code Scaffolding
Generate Angular components and services:

Bash

ng generate component component-name
ng generate service service-name
ng generate module module-name
🔧 Configuration
Angular Configuration (angular.json)
Defines:

Build settings

Assets

Styles

Entry points

Environment Configuration
TypeScript

// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
⚡ Challenges Faced
Angular build configuration issues (Zone.js, builder errors)

Routing and navigation bugs

Dependency conflicts and version mismatches

Template errors and module import issues

Debugging runtime UI issues (non-loading components)

🔮 Future Enhancements
🔐 Authentication & Login System

👥 Role-Based Access Control

📊 Advanced Dashboard Analytics

🌐 Backend Integration (Node.js / Firebase)

📱 Enhanced Mobile Responsiveness

👩‍💻 Author
Chanchal Vora
B.Tech IT | Frontend Developer | Problem Solver

⭐ Support
If you found this project useful, consider giving it a ⭐ on GitHub!
