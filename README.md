
# Boilerplate code for authentication using passport.js 

Username, password authentication using passportjs.




# Username-Password Authentication Boilerplate with Passport.js

This is a simple boilerplate for implementing username-password authentication using the Passport.js library in Node.js. You can use this boilerplate to quickly set up user authentication in your Node.js projects.

## Getting Started

Follow the steps below to set up and run the authentication system locally on your computer.

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- Node.js: [Download Node.js](https://nodejs.org/)
- MongoDB Locally or atlas : [Download MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/randilt/username-password-auth-boilerplate.git

1. Navigate to the project directory:

   ```bash
   cd username-password-auth-boilerplate

1. Install the required npm packages:

   ```bash
   git clone https://github.com/randilt/username-password-auth-boilerplate.git

1. Clone the repository to your local machine:

   ```bash
   npm install



## Configuration

Update the MongoDB Connection String:

Open the config/database.js file.
Replace the MongoDB connection string with your own. You can use a local MongoDB instance or a cloud-based MongoDB service like MongoDB Atlas.
Update App Configuration (Optional):

You can customize the application's configuration in the app.js file, such as the session settings or authentication strategies. After updating the database connetion strings in both app.js and config/database.js start the application by running this command in the terminal
    
      node app.js

## Usage

Visit the /register route to create a new user account.
Visit the /login route to log in with your credentials.
Once logged in, you can access the protected /home route.
The application includes authentication middleware to ensure that only authenticated users can access the /home route.









