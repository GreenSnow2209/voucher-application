# Voucher Application

## 📝 Overview

This is a NodeJS (ExpressJS) practice project focused on:

- Handling **MongoDB transactions** safely and efficiently.
- Issuing **vouchers** under a limited quota per event.
- Managing **edit locks** to prevent concurrent editing on events.
- Using **Bull queue** for background email processing.

This project helps reinforce concepts like database transaction integrity, retry logic, and distributed locking mechanisms.

---

## ⚙️ Environment Setup Guide

### 1. Install Node.js

Download and install Node.js from the official website:
https://nodejs.org/

### 2. Setup repo

Run ```npm init``` for create blank project

### 3. MongoDB & Mongoose Setup

Create a Database in MongoDB Atlas (Cloud)

In ```.env``` file, paste Mongo Uri into ```MONGO_URI=``` to connect Atlas

Install Mongoose in Project

```npm install mongoose```

### 4. ESLint

Install ESLint 

```bash 
npm install --save-dev eslint @eslint/js typescript typescript-eslint
```

```bash
npx eslint --init
```

```bash
npx eslint .
````

### 5. Setup and config CORS

Install the CORS middleware

```bash 
npm install cors
```

Add the following to your Express app (config/config.ts):

```
import cors from 'cors';

app.use(cors()); // Enable CORS for all host/port

//app.use(cors({ origin: 'http://localhost:3000' })); -> Customize allowed host/port
```

### 6. Setup and config Authentication

Use JWT (JSON Web Token) for authentication

```bash 
npm install jsonwebtoken
```

```bash 
npm install --save-dev @types/jsonwebtoken
```

### 7. Setup and config Swagger for RESTful APIs

Install Swagger packages

```bash 
npm install swagger-ui-express swagger-jsdoc
```
```bash 
npm install --save-dev @types/swagger-ui-express
```

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

### 3. Setup Environment Variables
Create ```.env``` file in the root directory with the following content
```
JWT_SECRET=
PORT=
MONGO_URI=
DATABASE_NAME=
```

### 3. Start the Server
Create ```.env``` file in the root directory with the following content
```bash
npm start
```


