# Voucher Application

## 📝 Overview

This is a NodeJS (ExpressJS) practice project focused on:

- Handling **MongoDB transactions** safely and efficiently.
- Issuing **vouchers** under a limited quota per event.
- Managing **edit locks** to prevent concurrent editing on events.
- Using **Bull queue** for background email processing.

This project helps reinforce concepts like database transaction integrity, retry logic, distributed locking mechanisms, and secure API development.

---

## 🏗️ Architecture

The application follows a **Clean Architecture** pattern with the following layers:

```
┌─────────────────┐
│   Controllers   │  ← HTTP request/response handling
├─────────────────┤
│    Services     │  ← Business logic
├─────────────────┤
│  Repositories   │  ← Data access layer
├─────────────────┤
│     Models      │  ← Data models and schemas
└─────────────────┘
```

### Key Components:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and orchestrate operations
- **Repositories**: Abstract data access layer
- **Models**: Define data structures and database schemas
- **Middlewares**: Authentication, validation, and security
- **Jobs**: Background processing with Agenda and Bull queues

---

## ⚙️ Environment Setup Guide

This project is designed as a Node.js training resource. Below you'll find step-by-step instructions for setting up the environment, along with explanations and usage examples for each important package.

---

### 1. Install Node.js

Download and install Node.js from the [official website](https://nodejs.org/).

Check your installation:

```bash
node -v
npm -v
```

---

### 2. Initialize the Project

If starting from scratch:

```bash
npm init -y
```

This creates a `package.json` file.

---

### 3. Install and Use Key Packages

#### **a. Express (Web Framework)**

Install:

```bash
npm install express
npm install --save-dev @types/express
```

Usage example (`src/app.ts`):

```js
import express from 'express';
const app = express();
app.listen(3000, () => console.log('Server running'));
```

---

#### **b. ESLint & Prettier (Linting & Formatting)**

Install:

```bash
npm install --save-dev eslint @eslint/js typescript typescript-eslint prettier eslint-config-prettier
```

Usage:

- Configure `.eslintrc` and `.prettierrc`
- Run `npx eslint .` and `npx prettier --write .`

---

#### **c. CORS (Cross-Origin Resource Sharing)**

Install:

```bash
npm install cors
npm install --save-dev @types/cors
```

Usage example:

```js
import cors from 'cors';
app.use(cors());

//app.use(cors({ origin: 'http://localhost:3000' })); -> Customize allowed host/port
```

---

#### **d. Mongoose (MongoDB ODM)**

Install:

```bash
npm install mongoose
npm install --save-dev @types/mongoose
```

Usage example:

```js
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/voucher_app');
```

---

#### **e. dotenv (Environment Variables)**

Install:

```bash
npm install dotenv
```

Usage example:

```js
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.PORT);
```

---

#### **f. JWT (Authentication)**

Install:

```bash
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

Usage example:

```js
import jwt from 'jsonwebtoken';
const token = jwt.sign({ userId: 1 }, 'your-secret');
```

---

#### **g. Joi (Validation)**

Install:

```bash
npm install joi
```

Usage example:

```js
import Joi from 'joi';
const schema = Joi.object({ name: Joi.string().required() });
```

---

#### **h. Bull & BullMQ (Job Queues)**

Install:

```bash
npm install bull bullmq
```

Usage example:

```js
import { Queue } from 'bullmq';
const queue = new Queue('my-queue');
```

---

#### **i. Agenda (Job Scheduler)**

Install:

```bash
npm install agenda
```

Usage example:

```js
import { Agenda } from 'agenda';
const agenda = new Agenda({ db: { address: 'mongodb://localhost:27017/agenda' } });
```

---

#### **j. Nodemailer (Email Sending)**

Install:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

Usage example:

```js
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({ /* config */ });
```

---

#### **k. Swagger (API Documentation)**

Install:

```bash
npm install swagger-ui-express swagger-jsdoc
npm install --save-dev @types/swagger-ui-express
```

Usage example:

```js
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc({ /* options */ })));
```

---

#### **l. Jest (Testing)**

Install:

```bash
npm install --save-dev jest ts-jest @types/jest
```

Usage:

- Configure `jest.config.js`
- Run `npx jest`

---

## 📚 Summary Table

| Package         | Purpose                        | Install Command                                 |
|-----------------|-------------------------------|-------------------------------------------------|
| express         | Web framework                  | npm install express @types/express              |
| eslint, prettier| Lint/format                    | npm install --save-dev eslint prettier ...      |
| cors            | CORS middleware                | npm install cors @types/cors                    |
| mongoose        | MongoDB ODM                    | npm install mongoose @types/mongoose            |
| dotenv          | Env variables                  | npm install dotenv                              |
| jsonwebtoken    | JWT auth                       | npm install jsonwebtoken @types/jsonwebtoken    |
| joi             | Validation                     | npm install joi                                 |
| bull/bullmq     | Job queue                      | npm install bull bullmq                         |
| agenda          | Job scheduler                  | npm install agenda                              |
| nodemailer      | Email sending                  | npm install nodemailer @types/nodemailer        |
| swagger-ui-express, swagger-jsdoc | API docs     | npm install swagger-ui-express swagger-jsdoc @types/swagger-ui-express |
| jest, ts-jest   | Testing                        | npm install --save-dev jest ts-jest @types/jest |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:GreenSnow2209/voucher-application.git
cd voucher-app
```

### 2. Install Dependencies

```bash
npm install
```

### 1. Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **Redis** (for queue processing)

### 2. Clone and Setup

```bash
git clone git@github.com:GreenSnow2209/voucher-application.git
cd voucher-application
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Application Configuration
NODE_ENV=development
PORT=3000

# Security (REQUIRED - change this!)
JWT_SECRET=your-super-secret-jwt-key-here

# Database Configuration
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=voucher_app

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASS=

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 4. Start the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Run Worker (for background jobs)
```bash
npm run worker
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

---

## 📊 API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:3000/`
- **Health Check**: `http://localhost:3000/health`

---

## 🔄 Background Jobs

### Agenda Jobs:
- **Database Health Check** - Monitors MongoDB connection every minute
- **Email Alerts** - Sends notifications on connection failures

### Bull Queue Jobs:
- **Email Processing** - Handles email sending in background

### Running Workers:
```bash
# Start the worker process
npm run worker
```

---

## 🧪 Testing

The project includes comprehensive testing setup:

### Test Structure:
```
src/tests/
├── setup/
│   └── mock-mongo.ts      # MongoDB test setup
└── unit/
    ├── auth/
    │   ├── login.test.ts
    │   └── register.test.ts
    └── services/
        ├── event.services/
        └── voucher.services/
```

### Running Tests:
```bash
# Run all tests
npm test

# Run specific test file
npm test -- login.test.ts

# Run tests with coverage
npm run test:coverage
```

---
