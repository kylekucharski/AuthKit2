# AuthKit2

AuthKit2 is a full-stack authentication system built to provide secure and efficient user registration, login, and profile management functionalities. This project leverages modern web development technologies to ensure a seamless and secure user experience, with an emphasis on scalability, data protection, and responsiveness.

## Features

- **User Registration and Login**: Secure user authentication with session management.
- **Profile Management**: Users can view and update profile information.
- **Password Reset and Account Verification**: Automated email notifications for secure password recovery and verification.
- **Responsive Design**: Frontend designed for a smooth user experience on any device.

## Tech Stack

- **Frontend**: React, Next.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Email Service**: SendGrid (for account verification and password reset)
- **Authentication**: JSON Web Tokens (JWT), bcrypt (password hashing)
- **Languages**: JavaScript, TypeScript
- **Environment Configuration**: dotenv

## Installation

### Prerequisites

- Node.js
- MongoDB (locally or using MongoDB Atlas for cloud)
- SendGrid Account (for email notifications)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/AuthKit2.git
    cd AuthKit2
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure Environment Variables: Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    SENDGRID_API_KEY=your_sendgrid_api_key
    ```

4. Run the server:

    ```bash
    npm run dev
    ```

5. Access the application: The server will start on `http://localhost:3000`.

## Project Structure

```plaintext
AuthKit2
├── backend
│   ├── src
│   │   ├── controllers    # Controller functions
│   │   ├── middleware     # Middleware for authentication, error handling
│   │   ├── models         # Mongoose schemas
│   │   ├── routes         # API endpoints
│   │   └── utils          # Utility functions
│   └── server.js          # Entry point for the backend server
└── client
    ├── src
    │   ├── components     # React components
    │   ├── context        # Context API for state management
    │   ├── pages          # Next.js pages for routing
    │   └── styles         # CSS files
    └── App.js             # Main App entry
