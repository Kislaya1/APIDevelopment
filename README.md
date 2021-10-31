# College Management System

Hi Guys ! I had created my first application using NodeJs , Express and My-Sql to create CRUD application which uses HTTP methods **(GET,POST,PUT,PATCH,DELETE)**.

The application comprises of 2 modules - **Student** and **Admin**.

Module description is as below : -

# Student Module

## Roles given to students are as : -

1. Student can login only if they are already present under the system without using the **login token**.
**(NOTE : Only admins will have the right to create new student entry)**

2. Student can read only a single student record by providing the correct **student record id.** by using the valid **login token**.

# Admin Module

## Roles given to admins are as : -

1. Admins can signup or login to the system without using valid **login token**.

2. Admins can perform below operations on students only after using valid **login token**.

    - Read all / single student record.
    - Create new student record.
    - Update the existing student record.
    - Delete the existing student record.

# API Endpoints for the modules

**Base URI - localhost:3000/api/v1/college/**

## Student Module

1. View Single Student Records (Only if exist in db) - (GET) : /student/record/:stdId
2. Log-in to System (Only if exist in db) - (POST) : /student/login

## Admin Module

1. Sign-up as Admin (Create admin record) - (POST) : /admin/signup
2. Login as Admin (Existing admin record) - (POST) : /admin/login
3. Add new Student (Only if not present in db) - (POST) : /admin/create/student/record
4. View Single Student - (GET) : /admin/student/record/:stdId
5. View All Students - (GET) : /admin/student/records
6. Edit the student record - (PATCH) : /admin/edit/student/record
7. Delete the student record - (DELETE) : /admin/delete/student/record

# How to run the application in your local : -

## Pre-Requisitive : -

### 1. Download the latest Node version. (for me it is v14.17.5)

### 2. Download MySql (8.0.x) version in your local using the link as - [My-SQL Download](https://dev.mysql.com/downloads/workbench/)

#### NOTE : In case you are facing issue with downloading refer to link - [Debug](https://www.youtube.com/watch?v=OM4aZJW_Ojs)

### 3. After successfully downloading mysql , follow the below sql commands

    - create database if not exists CollegeManagement;
    - use CollegeManagement;
    - create table if not exists admin_data(id INT NOT NULL AUTO_INCREMENT UNIQUE KEY, email varchar(256) PRIMARY KEY, password varchar(256) NOT NULL);
    - create table if not exists student_data(registrationId INT PRIMARY KEY, firstName varchar(25) NOT NULL, lastName varchar(25) NOT NULL, gender ENUM('Male', 'Female') NOT NULL, email varchar(256) NOT NULL UNIQUE KEY, password varchar(256) NOT NULL, age INT NOT NULL, contactNumber varchar(15) NOT NULL UNIQUE KEY, address varchar(256), isActive BOOLEAN);
    - ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
        For eg : ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';
        NOTE : root - username and admin - password.
    - flush privileges;
    - select * from student_data;
    - select * from admin_data;

### 3. After executing the above commands 2 tables namely student_data and admin_data for student and admin respectively will be created. Now clone / download the git project and run the following NodeJs command in the same directory where node project is located

    - npm install
    - npm run swagger-autogen

#### NOTE : Using the Install command node modules will be downloaded, and using swagger-autogen command swagger document will be generated and you can run the APIs

### Important URLs -

1. Swagger URL - [Local Swagger URL](http://localhost:3000/doc/#/)

**NOTE** : In case you are using Swagger for your manual testing please make sure to insert the JWT token in the format as
    **Bearer [token]**. Some changes needs to be done in Swagger documentation in order to accept **Bearer** part by default and that is in progress, but for now you can add **Bearer** part from your side.
