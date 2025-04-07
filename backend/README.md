# BitsAndBooks

A simple inventory and sales management system for Bits & Books.

---

## Prerequisites
1. Install **SQLite** if not already installed. You can download it [here](https://www.sqlite.org/download.html).
2. Install an IDE like **DataGrip** (recommended) or any text editor to work with SQLite databases.

---

## Setup Instructions
### Clone the Repository
1. Open a terminal or command prompt.
2. Run the following command to clone the repository:
   ```bash
   git clone <https://github.com/elijahmendezcs/BitsAndBooks.git>
   ```
   
3. Navigate into the project folder:
   ```bash
   cd BitsAndBooks
   ```

---

### Open the Database
1. Open **DataGrip** or your preferred SQLite client.
2. Add the `BitsAndBooks.sqlite` file as a new data source:
    - In **DataGrip**:
        - Go to **Database Explorer** > **+** > **Data Source** > **SQLite**.
        - Select the `BitsAndBooks.sqlite` file from the project folder.

---

### Load the Schema
1. Open the `schema.sql` file in the repository.
2. If you want to recreate the database structure:
    - Run the commands in `schema.sql` in the SQL console of your SQLite client.

---

### Step-by-Step Project Setup for Beginners
#### Step 1: Set Up the Database
1. Open **DataGrip** and add the `BitsAndBooks.sqlite` file as a data source.
2. Verify the database connection by testing the connection in DataGrip.

#### Step 2: View and Verify Data
1. Open the `Books` table under the `main` schema in **Database Explorer**.
2. Run queries like:
   ```sql
   SELECT * FROM Books LIMIT 10;
   ```

#### Step 3: Use the Schema
1. Open `schema.sql` to understand the database structure.
2. Use the schema to recreate tables or understand the project design.

---

### Optional: Contribute to the Project
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch-name
   ```
3. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin feature-branch-name
   ```
4. Open a pull request.

---
