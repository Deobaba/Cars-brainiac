# Project Name

A comprehensive API project built with Node.js, Mongo, and featuring security implementations, rate-limiting,  and robust error handling. The project is also set up for automated CI/CD deployment using GitHub Actions.

# Table of Contents

1. [Setup and Installation](#setup-and-installation)
2. [Pre-requisites](#pre-requisites)
3. [Step-by-Step Guide](#step-by-step-guide)
4. [API Endpoints](#api-endpoints)
5. [Security Implementations](#security-implementations)
6. [Error Handling](#error-handling)
7. [Deployment](#deployment)
   - [Dockerized Deployment to Heroku](#dockerized-deployment-to-heroku)
   - [CI/CD with GitHub Actions](#ci-cd-with-github-actions)
8. [Testing](#testing)
   - [Unit Tests](#unit-tests)
9. [Conclusion](#conclusion)

## Setup and Installation

### Pre-requisites

Ensure that the following software is installed and running on your machine:

- **Node.js**: v16+
- **MongoDB**: Ensure MongoDB is installed and running.
- **Docker**: (Optional but recommended for deployment)

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
APP_NAME=DEOBAB
APP_ENV=development
PORT=4000
MONGO_URL_DEV=mongodb://localhost:27017/cars
MONGO_URL_PROD=
ALLOWED_ORIGINS=deobaba.com,facebook.com,http://localhost:4000
JWT_SECRET=<your_jwt_secret e.g >
TOKEN_EXPIRES=30d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_CLOUD_API_KEY=
CLOUDINARY_CLOUD_API_SECRET=
```

1. Start the Server

```
npm run dev

```

## Build and Run Docker Image Locally

### Prerequisites

- Ensure you have [Docker](https://www.docker.com/get-started) installed on your machine.

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

## API Endpoints

| HTTP Method | Endpoint                        | Description                                             |
| ----------- | ------------------------------- | ------------------------------------------------------- |
| POST        | /api/users/create               | Create a new user                                       |
| POST        | /api/users/login                | login in user                                           |
| POST        | /api/car  [Protected-seller]    | post a new car by seller                                |
| GET         | /api/car[Protected-seller&buyer]| Retrieve all posts for a user                           |
| POST   | /api/car/:id [Protected-seller&buyer]| Add a comment to a post                                 |

# Database diagram

![alt text](https://res.cloudinary.com/babypicserver/image/upload/v1728769944/xhesdna1zpozboijyvyo.png)

# Security Implementations

### 1. CORS

The API is restricted to specific domains via CORS middleware. The allowed origins can be configured through environment variables for flexibility.

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
2. Docker installed locally for testing and development (optional).
3. A GitHub repository for the project.
4. PostgreSQL and Redis set up on your Heroku app.

## Deployment Workflow

This repository is configured with a GitHub Actions workflow that automatically deploys the application to Heroku whenever a PR is made to the `main` branch (or another branch if configured) and merged.

### Workflow Overview

The deployment workflow performs the following steps:

## RUN THE TEST.YAML WORKFLOW

1. **Checkout Repository Code:** Uses the `actions/checkout@v4` action to check out the repository’s code.
2. **Set up Node.js:** Uses `actions/setup-node@v3` to install and configure Node.js, specifying version 20 in the workflow.
3. **Cache Dependencies:** Uses `actions/cache@v2` to cache `npm` dependencies based on the `package-lock.json` file. This helps to speed up future runs by avoiding redundant installs.
4. **Install Dependencies:**  
   Runs `npm install` to install the necessary packages and dependencies for the project.
5. **Run Tests:** Executes the test suite using `npm test`, which runs all the unit or integration tests defined in the project.

## RUN THE DEPLOY.YAML WORKFLOW

- This workflow will be triggered only after the test workflow completes successfully.

1. **Checkout Code:** The GitHub Action checks out the repository's code.
2. **Install Heroku CLI:** Installs the Heroku CLI, necessary for pushing and releasing the Docker container.
3. **Log In to Heroku:** Authenticates with Heroku using the `HEROKU_API_KEY` secret.
4. **Build Docker Image:** Builds the Docker image for the application.
5. **Push Image to Heroku:** Pushes the built image to the Heroku Container Registry.
6. **Release Image on Heroku:** Releases the Docker image, making the application live.

### Setting Up Heroku and GitHub

#### Step 1: Create a Heroku Application

1. Log in to [Heroku](https://dashboard.heroku.com).
2. Create a new application by clicking the "New" button and selecting "Create new app".
3. Make note of the app name (you'll need it later).

#### Step 2: Add PostgreSQL and Redis Add-ons

1. Log in to Heroku and navigate to your app’s dashboard.
2. Go to the **Resources** tab and find the **Add-ons** section.
3. Add the following add-ons:
   - **PostgreSQL:** Search for `Heroku Postgres` and select a plan (e.g., Essential 0).
   - **Redis:** Search for `Heroku Key-Value Store` and select a plan (e.g., Mini).
4. The environment variables `DATABASE_URL` (for PostgreSQL) and `REDIS_URL` (for Redis) will be automatically added to your Heroku app's configuration.

#### Step 3: Add Config Vars to Heroku

1. Navigate to your app's dashboard on Heroku.
2. Go to the **Settings** tab and click on **Reveal Config Vars**.
3. Ensure the following configuration variables are set:
   - `DATABASE_URL`: This will be automatically set after adding the Postgres add-on.
   - `REDIS_URL`: This will be automatically set after adding the Redis add-on.
   - `HEROKU_APP_NAME`: Set this manually to the name of your Heroku app.
   - Other configuration variables that your app might require should be added here as needed.(WHITELISTED_IPS, etc)

#### Step 4: Add Heroku API Key and App Name to GitHub Secrets

1. Obtain your Heroku API key by visiting [Account Settings](https://dashboard.heroku.com/account) in Heroku.
2. In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
3. Add the following secrets:
   - Name: `HEROKU_API_KEY`
     - Value: Your Heroku API key.
   - Name: `HEROKU_APP_NAME`
     - Value: Your Heroku app name.

# Postman Documentation

For detailed API documentation and examples of how to interact with the endpoints, please refer to the Postman collection:

Postman Documentation Link
https://documenter.getpostman.com/view/38816098/2sAXxS8XJR
