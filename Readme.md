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

### 2. MongoDB & Mongoose Setup

Create a Database in MongoDB Atlas (Cloud)

Install Mongoose in Project

```npm install mongoose```

### 3. ESLint

Install ESLint 

```bash 
npm install --save-dev eslint @eslint/js typescript typescript-eslint
```

```bash
npx eslint --init
```

```bash
npx eslint .
```



---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/voucher-app.git
cd voucher-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables
Create ```.env``` file in the root directory with the following content
```
PORT=
MONGO_URI=
```

### 3. Start the Server
Create ```.env``` file in the root directory with the following content
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/voucher-app
REDIS_URL=redis://localhost:6379
```


