SELECT
    employee.id AS employee_id,
    employee.first_name || ' ' || employee.last_name AS Employee_Name, 
    role.title AS Role_Title, 
    department.name AS Department, 
    role.salary AS Salary, 
    manager.first_name || ' ' || manager.last_name AS manager_name
FROM 
    employee
JOIN 
    role ON employee.role_id = role.id
JOIN 
    department ON role.department = department.id
LEFT JOIN 
    employee AS manager ON employee.manager_id = manager.id;
