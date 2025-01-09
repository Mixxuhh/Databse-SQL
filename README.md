# SQL Employee Tracker

## Description

The **SQL Employee Tracker** is a Command-Line Interface (CLI) application I developed to help manage a company's employee database. This application allows users to view, add, and update departments, roles, and employees, all while maintaining a well-structured PostgreSQL database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)
- [Video](#video)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Database-SQL
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Create an .env file in the root directory and include the following:
   ```env
   DB_USER=<your_postgres_username>
   DB_PASSWORD=<your_postgressql_password>
   DB_NAME=sql_db
   ```

## Usage

1. Build the application:
   ```bash
   npm run build
   ```
2. Run the apllication:
   ```bash
   npm start
   ```
3. Use the CLI menu to interact with the database.

## Features

- View all departments with their IDs and names.
- View all roles, including title, salary, and associated department.
- View all employees, including their ID, name, role, department, salary, and manager.
- Add new departments, roles, and employees to the database.
- Update an employee's role dynamically.
- Designed with TypeScript and PostgreSQL for robust and scalable database management.

## Technologies Used

- Node.js: JavaScript runtime for executing CLI commands.
- TypeScript: Enhanced JavaScript with static typing.
- PostgreSQL: Relational database for managing employee data.
- Inquirer.js: Library for interactive prompts in the terminal.
- dotenv: For managing environment variables securely.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (git checkout -b feature-name).
3. Commit your changes (git commit -m 'Add feature').
4. Push to the branch (git push origin feature-name).
5. Open a pull request.

## Questions

If you have any questions about this project, feel free to reach out:

- GitHub: Mixxuhh
- Email: wwcrase@gmail.com

## Video

https://drive.google.com/file/d/1EmXcnWQqSJ5Ho1Vx4aYruGFMeFgvoGGh/view
