Overview
BitsAndBooks is a full-stack application composed of:
Backend: A Node.js/Express server that connects to an SQLite database. It provides REST API endpoints (e.g., /api/search) to query book data.
Database: An SQLite database (BitsAndBooks.sqlite) that holds the schema, data, and a view (view_books_with_authors) used for displaying the books table. (this is not given)
Frontend: A React application built with Vite that consumes the backend API and displays data to the user.
Prerequisites
Before you begin, make sure you have the following installed:
Git – To clone the repository.
Node.js (v16 or later) & npm – For installing backend and frontend dependencies.
SQLite – For handling the database (or use a graphical tool like DataGrip).
DataGrip or any SQLite client – To inspect the SQLite database and execute SQL scripts.
Python3 & venv – If you plan to run any of the Python scripts located in the backend (for seeding data, etc.).
Project Structure
Assuming the following folder structure:
bitsnbooks2/

├── backend/
│   ├── server.js               # Express server entry point
│   ├── BitsAndBooks.sqlite         # Main SQLite database file 
│   ├── package.json            # Node dependencies for backend
│   ├── views/
│   │   └── viewbookswithauthours.sql   # SQL file that creates view_books_with_authors
│   └── scripts/                # Python scripts to seed/populate the database (optional)
└── frontend/
    ├── package.json            # Node dependencies for frontend
    ├── vite.config.js          # Vite configuration (including API proxy if needed)
    └── src/                    # React source code

1. Clone the Repository
Open a terminal and run:
git clone https://github.com/elijahmendezcs/bitsnbooks2.git
cd bitsnbooks2
OR 
Press ctr + shift + p
On the search bar, git: clone
Paste this into the search bar: https://github.com/elijahmendezcs/bitsnbooks2.git

2. Setting Up the Database
Ensure you have the Database File:
Verify that BitsAndBooks.sqlite is in the backend file of your project.
Open DataGrip.
If you don’t have a project open, create one or open an existing one.
Add a New Data Source:
In the Database tool window (usually on the right side), click the + button (or right-click in the empty area) and choose Data Source → SQLite.
Alternatively, go to File → New → Data Source → SQLite.
Select/Create the Database File:
In the dialog that appears, click the … (browse) button next to the "Database file" field.
Navigate to BitsAndBooks.sqlite where you want to store your database.
Click OK.
Test the Connection:
Click the Test Connection button to verify that DataGrip can connect.
Once it confirms the connection, click OK or Apply to save the data source.
Load the Schema:
In the “files” section of DataGrip (view->tool windows->files).Open the schema.sql file (if provided) highlight the entire thing and run its contents to create tables (use sqlite and default schema). If successful you should see all the 12 tables but they are empty
Create the Required View:
In the backend folder, there is a file at backend/views/ViewVooksWithAuthours.sql that contains:
-- =======================================================
-- View: ViewBooksWithAuthors
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
Highlight and run again. You should get view_books_with_authors in your views folder

Execute this SQL against BitsAndBooks.sqlite so that the view is created. Change dialect to sqlite

3. Backend Setup:
Open a terminal and Navigate to the Backend Folder: cd backend
Install dependencies: npm install
Create a Virtual Environment named venv: python3 -m venv venv
Activate venv: Mac/linux(source venv/bin/activate), Windows(venv\Scripts\activate)
Once activated, your terminal prompt should change (typically prefixed by (venv)).
Install Faker library: pip install faker
Get into the scripts folder: cd scripts
Fill the database with 30M data: python3 seed_database.py
If successful you should see this message:
--- Bits & Books DB Seeder ---
0: Run all
1: Populate Stores
2: Populate Publishers
3: Populate Authors
4: Populate Employees
5: Populate Books
6: Populate Book-Author Links
7: Populate Customers
8: Populate Orders
9: Populate Order Details
10: Populate Inventory Purchases
q: Quit
Choose an option: (just input ‘0’)
Get back to backend directory: cd ..
Now start the server: node server.js
You should get this message: ✅ Server running on http://localhost:3001
4. Setting Up and Running the Frontend
a. Open another terminal and Navigate to the Frontend Directory
	cd frontend
b. Install Node.js Dependencies
	npm install
c. Start the Vite Development Server
	npm run dev
If successful you should see this:
> frontend@0.0.0 dev
> vite
  VITE v6.2.3  ready in 684 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
5. Coordinating Both Services
Running Simultaneously:
You’ll need both servers running. Open two separate terminal sessions:
One terminal for the backend.
Another for the frontend.
