# Expense Tracker

A full-stack expense tracking application built with React and Node.js that helps you manage your income and expenses with a clean, intuitive interface.

## Features

- **Transaction Management**: Add, edit, and delete income and expense transactions
- **Real-time Summary**: View your balance, total income, and total expenses at a glance
- **Visual Analytics**: Interactive charts to visualize your spending patterns
- **Filtering**: Filter transactions by type (income/expense), category, and date
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS
- **State Management**: Efficient state management using Redux Toolkit

## Tech Stack

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

## Configuration

### Backend Environment Setup

1. Create a `.env` file in the `backend` directory:
   ```bash
   cd backend
   touch .env
   ```

2. Add the following environment variables to `backend/.env`:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

   For local MongoDB:
   ```env
   MONGO_URI=mongodb://localhost:27017/expense-tracker
   PORT=5000
   ```

   For MongoDB Atlas, use your connection string:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
   PORT=5000
   ```

### Frontend API Configuration

If your backend runs on a different port, update the API base URL in the frontend Redux slice or create an environment file.

## Running the Application

### Start the Backend Server

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start the server:
   ```bash
   npm start
   ```
   
   The backend server will run on `http://localhost:5000` (or the port specified in your `.env` file).

### Start the Frontend Development Server

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Start the React development server:
   ```bash
   npm start
   ```
   
   The frontend will open automatically in your browser at `http://localhost:3000`.

## Project Structure

```
expense-tracker/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection configuration
│   ├── models/
│   │   └── transaction.js     # Transaction model schema
│   ├── routes/
│   │   └── transactionRoutes.js  # API routes for transactions
│   └── server.js              # Express server setup
│
├── frontend/
│   ├── public/                # Static assets
│   └── src/
│       ├── app/
│       │   └── store.js       # Redux store configuration
│       ├── features/
│       │   └── transactions/
│       │       ├── ChartComp.jsx          # Chart component
│       │       ├── Summary.jsx            # Summary component
│       │       ├── TransactionForm.jsx    # Add/Edit transaction form
│       │       ├── TransactionList.jsx    # Transaction list with filters
│       │       └── transactionsSlice.js   # Redux slice for transactions
│       ├── App.jsx            # Main app component
│       ├── index.jsx          # App entry point
│       └── index.css         # Global styles
│
└── README.md
```

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/transactions` - Get all transactions (supports query filters: `type`, `category`, `date`)
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

### Example API Usage

```javascript
// Get all transactions
GET http://localhost:5000/api/transactions

// Get income transactions
GET http://localhost:5000/api/transactions?type=income

// Get transactions by category
GET http://localhost:5000/api/transactions?category=groceries

// Create a transaction
POST http://localhost:5000/api/transactions
Content-Type: application/json

{
  "type": "expense",
  "amount": 50.00,
  "description": "Grocery shopping",
  "category": "groceries",
  "date": "2024-01-15"
}
```

## Usage

1. **Adding a Transaction**:
   - Select transaction type (Income or Expense)
   - Enter the amount
   - Optionally add a description and category
   - Select a date (defaults to today)
   - Click submit

2. **Viewing Transactions**:
   - All transactions are displayed in the transaction list
   - Use filters to narrow down transactions by type, category, or date

3. **Editing a Transaction**:
   - Click the edit button on any transaction
   - Modify the fields and save

4. **Deleting a Transaction**:
   - Click the delete button on any transaction
   - Confirm the deletion

5. **Viewing Summary**:
   - Check the Summary panel for total balance, income, and expenses

6. **Viewing Charts**:
   - Visualize your spending patterns in the Chart component

## Building for Production

### Frontend

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/build` directory.

### Backend

The backend can be run in production using:
```bash
cd backend
node server.js
```

Or using a process manager like PM2:
```bash
pm2 start backend/server.js
```