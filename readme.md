# My E-commerce Site

This repository contains the code for a simple e-commerce site. It's a proof-of-concept project to demonstrate backend functionality using Node.js, Express, and MongoDB, with user authentication via Google OAuth.

## Features

- User authentication with Google Sign-In
- CRUD operations for product management
- Shopping cart functionality
- Checkout and order processing

## Technologies Used

- Node.js
- Express.js
- Passport.js
- MongoDB with Mongoose

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- Node.js
- npm (comes with Node.js)
- MongoDB

### Installing

A step-by-step series of instructions that tell you how to get a development environment running.

1. Clone the repository to your local machine:

   ```sh
   git clone git@github.com:AidanXu/ecommerce-project.git
   ```

2. Navigate to the project directory:

   ```sh
   cd ecommerce-project
   ```

3. Install the required dependencies:

   ```sh
   npm install
   ```

4. Create a .env file in the root directory of your project. Add the following environment variables with your own values:

   ```sh
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   MONGO_URI=your-full-mongodb-uri
   SESSION_SECRET=any-complex-string
   ```

5. Start the application:

   ```sh
   npm start
   ```

6. Visit http://localhost:3000 in your web browser to see the application in action.
