# Project Name

A comprehensive API project built with Node.js, Mongo, and featuring security implementations, rate-limiting,  and robust error handling. The project is also set up for automated CI/CD deployment using GitHub Actions.

# deployed link 
check service health (/)
render - https://cars-brainiac.onrender.com
heroku - https://carbrainiac-5e171b67476a.herokuapp.com (might be down)

# Table of Contents

- [Project Name](#project-name)
- [deployed link](#deployed-link)
- [Table of Contents](#table-of-contents)
  - [Setup and Installation](#setup-and-installation)
    - [Pre-requisites](#pre-requisites)
    - [Step-by-Step Guide](#step-by-step-guide)
      - [1. Clone the Repository](#1-clone-the-repository)
      - [2. Install Dependencies](#2-install-dependencies)
    - [3. Set Up Environment Variables](#3-set-up-environment-variables)
  - [API Endpoints](#api-endpoints)
- [Database diagram](#database-diagram)
- [Backend Architecture](#backend-architecture)
- [Security Implementations](#security-implementations)
    - [1. CORS](#1-cors)
    - [2. Rate Limiting](#2-rate-limiting)
    - [3. Helmet](#3-helmet)
- [Error Handling](#error-handling)
- [Deploying to Heroku with GitHub Actions](#deploying-to-heroku-with-github-actions)
  - [Prerequisites](#prerequisites)
  - [Deployment Workflow](#deployment-workflow)
    - [Workflow Overview](#workflow-overview)
- [Test and Deploy to Heroku Workflow](#test-and-deploy-to-heroku-workflow)
  - [Workflow Overview](#workflow-overview-1)
  - [Summary](#summary)
- [Swagger Documentation](#swagger-documentation)

## Setup and Installation

### Pre-requisites

Ensure that the following software is installed and running on your machine:

- **Node.js**: v16+
- **MongoDB**: Ensure MongoDB is installed and running.


### Step-by-Step Guide

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

#### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env file in the root directory and provide the following values:

```
APP_NAME=
APP_ENV=development | production
PORT=4000
MONGO_URL_DEV=<mongodb://localhost:27017/cars>
MONGO_URL_PROD=
ALLOWED_ORIGINS=http://localhost:4000,https://cars-brainiac.onrender.com
JWT_SECRET=<your_jwt_secret e.g >
TOKEN_EXPIRES=<30d>
CLOUDINARY_CLOUD_NAME=<dlbwktrdc>
CLOUDINARY_CLOUD_API_KEY=<642815273652323>
CLOUDINARY_CLOUD_API_SECRET=<fu__lJiJvHJ1g0j-MbEvhWbgUyA>
```

1. Start the Server

```
npm run dev [development]

or

npm run start [production]

```
2. To run unit test 
```
npm run test
```

## API Endpoints

| HTTP Method | Endpoint                            | Description                                             |
| ----------- | ------------------------------------| ------------------------------------------------------- |
| POST        | /api/users/create                   | Create a new user                                       |
| POST        | /api/users/login                    | login in user                                           |
| POST        | /api/car  [Protected-seller]        | post a new car by seller                                |
| GET         | /api/car[Protected-seller&buyer]    | Retrieve all posts for a user                           |
| POST        | /api/car/:id[Protected-seller&buyer]| Add a comment to a post                                 |

# Database diagram

![alt text](https://res.cloudinary.com/dbuaprzc0/image/upload/v1730228440/car-brainaic/carbrainiac__car-brainaic_1730228436832.jpg)

# Backend Architecture
![alt text](https://res.cloudinary.com/dbuaprzc0/image/upload/v1730228440/car-brainaic/carbrainiac__car-brainaic_1730228436833.jpg)

# Security Implementations

### 1. CORS

The API is restricted to specific domains via CORS middleware. The allowed origins can be configured through environment variables for flexibility.(add your local url or deployed url to ALLOWED_ORIGINS )

### 2. Rate Limiting

To prevent DDoS attacks and brute-force attempts, rate-limiting restricts the number of requests a single IP can make in a given time window.

### 3. Helmet

Helmet adds security headers to protect the application from common web vulnerabilities such as XSS, clickjacking, and others.

# Error Handling

A global error handler catches all errors and logs them via Winston for traceability. Custom error classes ensure proper status codes and error messages are returned to clients

# Deploying to Heroku with GitHub Actions 

This project is configured to automatically deploy to [Heroku](https://www.heroku.com) using GitHub Actions. The deployment process uses Docker to containerize the application and push it to Heroku's container registry. Additionally, PostgreSQL and Redis add-ons are set up to provide database and caching services.

## Prerequisites

1. A Heroku account and a Heroku application.
2. A GitHub repository for the project.


## Deployment Workflow

This repository is configured with a GitHub Actions workflow that automatically deploys the application to Heroku whenever a PR is made to the `main` branch (or another branch if configured) and merged.

### Workflow Overview

The deployment workflow performs the following steps:

# Test and Deploy to Heroku Workflow

This GitHub Actions workflow automates the process of testing and deploying a Node.js application to Heroku whenever there is a push to the `main` branch.

## Workflow Overview

1. **Trigger:**  
   The workflow is triggered on a push event to the `main` branch.

2. **Job:**  
   The workflow contains a single job named `test-and-deploy`, which runs on the latest version of Ubuntu.

3. **Steps:**

   - **Checkout Code:**  
     Utilizes the `actions/checkout@v2` action to check out the repository's code. This step ensures that the latest version of the code is available for subsequent steps.

   - **Set up Node.js:**  
     Uses `actions/setup-node@v2` to install and configure Node.js, specifying version 16. This ensures that the workflow runs in an environment that matches the project’s requirements.

   - **Install Dependencies:**  
     Runs `npm install` to install all necessary packages and dependencies for the project. This step is crucial for ensuring that the application can run and tests can be executed.

   - **Run Tests:**  
     Executes the test suite using `npm test`. The `CI: true` environment variable is set to ensure that Jest runs in CI mode, preventing accidental hangs during testing.

   - **Build the Project:**  
     Executes `npm run build` to build the project. This step compiles the application and prepares it for deployment.

   - **Deploy to Heroku:**  
     Uses the `akhileshns/heroku-deploy@v3.13.15` action to deploy the application to Heroku. The following parameters are used:
     - `heroku_app_name`: The name of your Heroku app, retrieved from GitHub Secrets.
     - `heroku_email`: Your Heroku account email, also retrieved from GitHub Secrets.
     - `heroku_api_key`: Your Heroku API key, securely accessed from GitHub Secrets.

## Summary
This workflow automates the critical steps of testing and deploying a Node.js application to Heroku, ensuring that your application is always up to date and functioning correctly after every push to the main branch. By leveraging GitHub Actions, you can maintain a streamlined development process and quickly respond to changes in your codebase.

# Swagger Documentation

For detailed API documentation and examples of how to interact with the endpoints, please refer to the Swagger collection:

swagger Documentation Link
for local: http://localhost:{PORT}/api-docs/#/Cars/get_api_cars example (http://localhost:4000/api-docs/#/Cars/get_api_cars )
for deployed: https://cars-brainiac.onrender.com/api-docs/#/
