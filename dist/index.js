import inquirer from "inquirer";
import pool from "./connection.js";
const queryDB = async (query, params = []) => {
    try {
        const result = await pool.query(query, params);
        return result.rows;
    }
    catch (error) {
        console.error("Database error", error);
        return [];
    }
};
const mainMenu = async () => {
    const { choice } = await inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Exit",
        ],
    });
    switch (choice) {
        case "View All Departments":
            await viewDepartments();
            break;
        case "View All Roles":
            await viewRoles();
            break;
        case "View All Employees":
            await viewEmployees();
            break;
        case "Add Department":
            await addDepartment();
            break;
        case "Add Role":
            await addRole();
            break;
        case "Add Employee":
            await addEmployee();
            break;
        case "Update Employee Role":
            await updateEmployeeRole();
            break;
        case "Exit":
            console.log("Goodbye!");
            process.exit(0);
    }
    mainMenu();
};
const viewDepartments = async () => {
    const departments = await queryDB("SELECT * FROM department");
    console.log("\nDepartments:");
    console.table(departments);
};
const viewRoles = async () => {
    const roles = await queryDB(`SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department = department.id`);
    console.log("\nRoles:");
    console.table(roles);
};
const viewEmployees = async () => {
    const employees = await queryDB(`SELECT employee.id, employee.first_name, employee.last_name, role.title AS role,
            department.name AS department, role.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
     FROM employee
     LEFT JOIN role ON employee.role_id = role.id
     LEFT JOIN department ON role.department = department.id
     LEFT JOIN employee AS manager ON employee.manager_id = manager.id`);
    console.log("\nEmployees:");
    console.table(employees);
};
const addDepartment = async () => {
    const { name } = await inquirer.prompt({
        name: "name",
        type: "input",
        message: "Enter the department name:",
    });
    await queryDB("INSERT INTO department (name) VALUES ($1)", [name]);
    console.log(`Added department: ${name}`);
};
const addRole = async () => {
    const departments = await queryDB("SELECT id, name FROM department");
    const { title, salary, departmentId } = await inquirer.prompt([
        { name: "title", type: "input", message: "Enter the role title:" },
        { name: "salary", type: "input", message: "Enter the role salary" },
        {
            name: "departmentId",
            type: "input",
            message: "Select the department",
            choices: departments.map((dept) => ({ name: dept.name, value: dept.id })),
        },
    ]);
    await queryDB("INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)", [title, salary, departmentId]);
    console.log(`Added role: ${title}`);
};
const addEmployee = async () => {
    const roles = await queryDB("SELECT id, title FROM role");
    const employees = await queryDB("SELECT id, first_name, last_name FROM employee");
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter the employees first name:",
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter the employees last name:",
        },
        {
            name: "roleId",
            type: "list",
            message: "Select the employee's role:",
            choices: roles.map((role) => ({ name: role.tile, value: role.id })),
        },
        {
            name: "managerId",
            type: "list",
            message: "Select the employee's manager",
            choices: [
                { name: "None", value: null },
                ...employees.map((emp) => ({
                    name: `${emp.first_name} ${emp.last_name}`,
                    value: emp.id,
                })),
            ],
        },
    ]);
    await queryDB("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [firstName, lastName, roleId, managerId]);
    console.log(`Added employee: ${firstName} ${lastName}`);
};
const updateEmployeeRole = async () => {
    const employees = await queryDB("SELECT id, first_name, last_name FROM employee");
    const roles = await queryDB("SELECT id, title FROM role");
    const { employeeId, newRoleId } = await inquirer.prompt([
        {
            name: "employeeId",
            type: "list",
            message: "Select the employee to update:",
            choices: employees.map((emp) => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id,
            })),
        },
        {
            name: "newRoleId",
            type: "list",
            message: "Select the new role:",
            choices: roles.map((role) => ({ name: role.title, value: role.id })),
        },
    ]);
    await queryDB("UPDATE employee SET role_id = $1 WHERE id = $2", [
        newRoleId,
        employeeId,
    ]);
    console.log("Employee role updated successfully!");
};
mainMenu();
