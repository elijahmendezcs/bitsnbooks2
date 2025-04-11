BitsAndBooks Setup

Overview

BitsAndBooks is a full-stack application composed of:

Backend: A Node.js/Express server that connects to an SQLite database. It provides REST API endpoints (e.g., /api/search) to query book data.
Database: An SQLite database (BitsAndBooks.sqlite) that holds the schema, data, and a view (view_books_with_authors) used for displaying the books table.
Frontend: A React application built with Vite that consumes the backend API and displays data to the user.
Prerequisites

Before you begin, make sure you have the following installed:

Git – To clone the repository.
Node.js (v16 or later) & npm – For installing backend and frontend dependencies.
SQLite – For handling the database (or use a graphical tool like DataGrip).
DataGrip or any SQLite client – To inspect the SQLite database and execute SQL scripts.
Python 3 & venv – If you plan to run any of the Python scripts located in the backend (for seeding data, etc.).
Project Structure

Assuming the following folder structure:

bitsnbooks2/
├── backend/
│   ├── server.js               # Express server entry point
│   ├── BitsAndBooks.sqlite     # Main SQLite database file
│   ├── package.json            # Node dependencies for backend
│   ├── views/
│   │   └── viewbookswithauthours.sql   # SQL file that creates view_books_with_authors
│   └── scripts/                # Python scripts to seed/populate the database (optional)
└── frontend/
    ├── package.json            # Node dependencies for frontend
    ├── vite.config.js          # Vite configuration (including API proxy if needed)
    └── src/                    # React source code
1. Clone the Repository

Using Git Commands
Open a terminal and run:

git clone https://github.com/elijahmendezcs/bitsnbooks2.git
cd bitsnbooks2
Using VS Code Git Integration
Press Ctrl + Shift + P (Windows/Linux) or Cmd + Shift + P (macOS) to open the Command Palette.
In the search bar, type: git: clone.
Paste in the repo URL: https://github.com/elijahmendezcs/bitsnbooks2.git and choose a destination folder.
2. Setting Up the Database

Option A: Use the Database File in the backend Folder
Ensure you have the Database File
Confirm that BitsAndBooks.sqlite is located in the backend folder of your project.
Open DataGrip (or SQLite client)
If you don’t have a project open, create one or open an existing one.
Add a new data source for SQLite.
Create the Data Source
In DataGrip’s Database tool window, click the + button and choose Data Source → SQLite.
In the dialog, click the … (browse) button next to "Database file," navigate to BitsAndBooks.sqlite in your backend folder, and confirm.
Test the Connection
Click Test Connection to verify that DataGrip can connect.
Click OK or Apply to save the data source.
Load the Schema
In DataGrip, open any schema.sql file (if provided) and run its contents to create tables.
You should see 12 tables (or however many are defined) appear in the database tool window if successful.
Create the Required View
In the backend/views/ folder, open viewbookswithauthours.sql:
-- =======================================================
-- View: view_books_with_authors
-- Shows all books with their authors
-- =======================================================

CREATE VIEW view_books_with_authors AS
SELECT
    b.title AS book_title,
    b.isbn,
    a.first_name || ' ' || a.last_name AS author_name
FROM books b
JOIN book_authors ba ON b.book_id = ba.book_id
JOIN authors a ON ba.author_id = a.author_id;
Highlight the entire statement and run it. You should then see view_books_with_authors listed under "Views" in DataGrip.
3. Backend Setup

Open a Terminal and Navigate to the Backend Folder
cd backend
Install Dependencies
npm install
Create a Virtual Environment
python3 -m venv venv
Activate venv
macOS/Linux:
source venv/bin/activate
Windows:
venv\Scripts\activate
Install Faker (if needed)
pip install faker
Populate the Database
cd scripts
python3 seed_database.py
You’ll see a menu like this:

--- Bits & Books DB Seeder ---
0: Run all
1: Populate Stores
...
q: Quit
Type 0 to run all seeding steps. This should insert data into all tables.
Return to Backend Folder
cd ..
Start the Server
node server.js
You should see:

✅ Server running on http://localhost:3001
4. Setting Up and Running the Frontend

Open Another Terminal
(Keep your backend server running in the first terminal.)
Navigate to the Frontend Folder
cd ../frontend
Install Dependencies
npm install
Start the Vite Development Server
npm run dev
You should see output like:

> frontend@0.0.0 dev
> vite

VITE v6.2.3  ready in 684 ms
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
5. Coordinating Both Services

To run the full stack:

Backend on Port 3001
In the first terminal (inside the backend folder), run node server.js.
Frontend on Port 5173
In a second terminal (inside the frontend folder), run npm run dev.
Open http://localhost:5173/ in your browser. The frontend should communicate with the backend (http://localhost:3001) for data.
