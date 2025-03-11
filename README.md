# FinanceFlow

FinanceFlow is a personal finance management application that helps users track their income, expenses, and savings efficiently. It provides insightful analytics and budget planning tools to maintain financial stability.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization
- Expense tracking with categorized transactions
- Budget planning and financial goal setting
- Data visualization through charts and graphs
- Responsive UI for web and mobile

## Tech Stack
- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

## Project Structure
```
FinanceFlow/
│── client/             # Frontend React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application pages
│   │   ├── store/      # Redux state management
│   │   ├── App.js
│   │   ├── index.js
│── server/             # Backend API
│   ├── controllers/    # Business logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth & validation middlewares
│   ├── config/         # Configuration files
│   ├── server.js       # Express app setup
│── .env                # Environment variables
│── package.json        # Dependencies
│── README.md           # Project documentation
```

## Installation
### Prerequisites
- Node.js & npm
- MongoDB installed and running

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/TheCurryGuy/FinanceFlow.git
   cd FinanceFlow
   ```
2. Install dependencies:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
3. Create a `.env` file in the `server/` directory and configure environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```sh
   cd server
   npm start
   ```
5. Start the frontend:
   ```sh
   cd client
   npm start
   ```
6. Open `http://localhost:3000` in your browser.

## Usage
1. Sign up and log in to your account.
2. Add income and expense transactions.
3. Visualize financial insights through the dashboard.
4. Set budget goals and track savings progress.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License.

