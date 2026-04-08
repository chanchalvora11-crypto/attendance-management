# Attendance Management System

A modern, responsive web-based attendance management application built with Angular 20. This system enables efficient tracking and management of attendance records for educational institutions or organizations.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Code Scaffolding](#code-scaffolding)
- [Configuration](#configuration)

## Overview

The Attendance Management System is a lightweight, user-friendly application designed to streamline the process of recording, tracking, and reporting attendance. Built with the latest Angular framework, it provides a modern, intuitive interface for managing attendance records efficiently.

This application is suitable for:
- Educational institutions (schools, colleges, universities)
- Corporate organizations
- Training centers and workshops
- Any entity requiring centralized attendance tracking

## Features

- **User-Friendly Interface**: Clean and intuitive design for easy navigation
- **Attendance Tracking**: Simple interface to mark and record attendance
- **Dashboard**: Overview of attendance statistics and summaries
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Instant reflection of attendance changes
- **Data Management**: Create, read, update, and delete attendance records
- **Reporting**: Generate attendance reports for analysis
- **Scalable Architecture**: Built with Angular best practices for easy expansion

## Tech Stack

The project uses modern web technologies:

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Angular** | Frontend Framework | 20.3.13 |
| **TypeScript** | Programming Language | Latest |
| **SCSS** | Styling | - |
| **HTML5** | Markup | - |
| **Angular CLI** | Development & Build Tool | 20.3.13 |

### Language Distribution
- TypeScript: 67.7%
- SCSS: 14.9%
- HTML: 11.3%
- CSS: 6.1%

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher) or **yarn**
- **Angular CLI** (v20.3.13 or compatible)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation of Prerequisites

1. **Install Node.js and npm**
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **Install Angular CLI**
   ```bash
   npm install -g @angular/cli@20.3.13
   ```

3. **Verify Angular CLI installation**
   ```bash
   ng version
   ```

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ChanchalVora/attendance-management.git
   cd attendance-management
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all required packages listed in `package.json`

3. **Verify Installation**
   ```bash
   npm list
   ```

## Development

### Starting the Development Server

To start the local development server with live reload:

```bash
ng serve
```

Or using npm:

```bash
npm start
```

Once the server is running:
- Open your browser and navigate to `http://localhost:4200/`
- The application will automatically reload whenever you modify any source files
- Check the terminal for compilation status and errors

### Development Workflow

1. Make changes to your code in the `src/` directory
2. The browser will automatically refresh with your changes
3. Check the browser console for any compilation errors
4. Use Angular DevTools browser extension for debugging

### Hot Module Replacement (HMR)

Changes are automatically reflected in your browser without manual refresh, improving development workflow efficiency.

## Building for Production

To build the project for production deployment:

```bash
ng build
```

Or with optimization flags:

```bash
ng build --configuration production
```

### Build Output

- Build artifacts are stored in the `dist/` directory
- The production build automatically optimizes your application for:
  - Performance (minification and bundling)
  - Speed (tree-shaking and lazy loading)
  - File size (compression)

### Production Build Options

```bash
# Build with all optimizations
ng build --prod

# Build with source maps for debugging
ng build --source-map

# Build with specific configuration
ng build --configuration=staging
```

## Testing

### Unit Tests

Execute unit tests using the Karma test runner:

```bash
ng test
```

Features:
- Runs tests in watch mode by default
- Automatically reruns tests on file changes
- Generates code coverage reports (optional)

**Run tests with coverage:**
```bash
ng test --code-coverage
```

### End-to-End (E2E) Tests

For end-to-end testing:

```bash
ng e2e
```

**Note**: Angular CLI does not come with an end-to-end testing framework by default. You can choose from:
- Cypress
- Protractor (deprecated)
- Playwright
- WebDriver

### Test Configuration

Test configurations are defined in:
- `karma.conf.js` - Unit test configuration
- `tsconfig.spec.json` - TypeScript configuration for tests
- Individual `.spec.ts` files - Test cases

## Project Structure

```
attendance-management/
├── src/
│   ├── app/                    # Angular application code
│   │   ├── components/         # Reusable UI components
│   │   ├── services/           # Business logic and API services
│   │   ├── models/             # TypeScript interfaces and classes
│   │   ├── pipes/              # Custom pipes
│   │   ├── directives/         # Custom directives
│   │   ├── app.component.*     # Root component
│   │   └── app.module.ts       # Root module
│   ├── assets/                 # Static files (images, icons, data)
│   ├── styles/                 # Global styles
│   ├── index.html              # Main HTML file
│   ├── main.ts                 # Application entry point
│   ├── styles.scss             # Global styles
│   └── environments/           # Environment-specific configurations
├── public/                     # Public assets
├── .vscode/                    # VS Code settings
├── angular.json                # Angular CLI configuration
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # TypeScript app configuration
├── tsconfig.spec.json          # TypeScript spec configuration
├── .editorconfig               # Editor configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools to generate new components, services, and other entities.

### Generating a New Component

```bash
ng generate component component-name
```

Generates:
- `component-name.component.ts` - Component class
- `component-name.component.html` - Template
- `component-name.component.scss` - Styles
- `component-name.component.spec.ts` - Unit tests

### Generating Other Angular Elements

```bash
# Generate a service
ng generate service service-name

# Generate a directive
ng generate directive directive-name

# Generate a pipe
ng generate pipe pipe-name

# Generate a module
ng generate module module-name

# Generate a class
ng generate class class-name

# Generate an interface
ng generate interface interface-name
```

### View All Available Schematics

```bash
ng generate --help
```

## Configuration

### Angular Configuration

The project configuration is defined in `angular.json`:

```json
{
  "projects": {
    "attendance-management": {
      "projectType": "application",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/attendance-management",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.scss"],
            "scripts": []
          }
        }
      }
    }
  }
}
```

### Environment Configuration

Configure environment-specific variables in `src/environments/`:

```typescript
// environment.ts (development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};

// environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com'
};
```

### TypeScript Configuration

Core TypeScript settings in `tsconfig.json`:
- Strict mode enabled
- ES2020+ target
- Module resolution configured

## Best Practices

### Code Style

- Follow Angular style guide conventions
- Use meaningful variable and function names
- Keep components focused and single-responsibility
- Document complex logic with comments

### Performance

- Use OnPush change detection where appropriate
- Implement lazy loading for feature modules
- Unsubscribe from observables to prevent memory leaks
- Use trackBy in *ngFor loops

### Security

- Sanitize user input to prevent XSS attacks
- Use Angular's built-in security features
- Keep dependencies updated
- Use HTTPS in production

## Troubleshooting

### Common Issues

**Issue: Port 4200 already in use**
```bash
ng serve --port 4300
```

**Issue: Module not found errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: Build size too large**
- Enable production build
- Implement lazy loading
- Remove unused dependencies
- Use tree-shaking

## Additional Resources

- [Angular Official Documentation](https://angular.io)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Angular Best Practices](https://angular.io/guide/styleguide)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)


## Quick Reference

### Commonly Used Commands

```bash
# Development
ng serve                          # Start dev server
ng serve --port 4300             # Use specific port

# Building
ng build                          # Development build
ng build --prod                   # Production build
ng build --configuration staging  # Staging build

# Testing
ng test                           # Run unit tests
ng test --code-coverage          # With coverage report
ng e2e                           # Run E2E tests

# Code Generation
ng generate component name        # New component
ng generate service name          # New service
ng generate module name           # New module

# Cleanup
npm install                       # Install dependencies
npm update                        # Update packages
```

---

**Last Updated**: January 2026  
**Angular Version**: 20.3.13  
**Node Version**: v18.x or higherI Overview and Command Reference](https://angular.dev/tools/cli) page.
