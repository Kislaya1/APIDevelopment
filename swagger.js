const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./api/college/router.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "College Management System",
        description: "<b>Swagger Documentation for College Management</b>"
    },
    host: "localhost:3000",
    basePath: "/api/v1/college/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Student Api",
            "description": "<i>(Api accessed by students only)</i>"
        },
        {
            "name" : "Admin Api",
            "description" : "<i>(Api accessed by admins only)</i>"
        }
    ],
    securityDefinitions: {
        Bearer: {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "Enter JWT Token"
        }
    },
    definitions: {
        UnauthorizationStdAdmin: {
            "success" : false,
            "statusMessage" : "401 : Unauthorized",
            "message" : "Invalid Token"
        },
        AccessDeniedStdAdmin: {
            "success" : false,
            "statusMessage" : "403 : Forbidden",
            "message" : "Access Denied! Unauthorized user"  
        },
        GetStudentByIdSuccess: {
            "success" : true,
            "statusMessage" : "200 : Ok",
            "data": {
                "registrationId": 1,
                "firstName": "Tom",
                "lastName": "Hanks",
                "gender": "Male",
                "email": "tom@abc.com",
                "age": 25,
                "contactNumber": "304-332-4163",
                "address": "4580 Grasselli Street, Manchester, USA",
                "isActive": 1
            }
        },
        GetStudentByIdNotFound: {
            "success" : false,
            "statusMessage" : "404 : Not Found",
            "message" : "No Records Found ! Please contact your admin."
        },
        LoginStd: {
            "email": "email@abcd.com",
            "password": "abcd@123"
        },
        LoginStdUnsuccess: {
            "success" : false,
            "statusMessage" : "401 : Unauthorized",
            "message" : "Student Login Unsuccessful ! No Records Found. Please contact your admin."
        },
        LoginStdSuccess: {
            "success" : true,
            "statusMessage" : "200 : Ok",
            "message" : "Student Login Successfully. Token will be valid till 2 hour",
            "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        },
        LoginStdInvalidDetails: {
            "success" : true,
            "statusMessage" : "401 : Unauthorized",
            "message" : "Student Invalid Email or Password"
        },
        GetStudentByIdNotFoundAdmin: {
            "success" : false,
            "statusMessage" : "404 : Not Found",
            "message" : "No Records Found ! Please create new record"
        },
        GetStudentByIdSuccessAdmin: {
            "success" : true,
            "statusMessage" : "200 : Ok",
            "data": {
                "registrationId": 1,
                "firstName": "Tom",
                "lastName": "Hanks",
                "gender": "Male",
                "email": "tom@abc.com",
                "age": 25,
                "contactNumber": "304-332-4163",
                "address": "4580 Grasselli Street, Manchester, USA",
                "isActive": 1
            }
        },
        SignupAdmin: {
            "email": "email@abcd.com",
            "password": "abcd@123"
        },
        SignupAdminFailed: {
            "success" : false,
            "statusMessage" : "500 : Internal Server Error",
            "message" : "Database connection error ! Please check the data you are trying to add."
        },
        SignupAdminSuccess: {
            "success" : true,
            "statusMessage" : "Admin Signup Successfully ! Login using same credentials."
        },
        LoginAdmin: {
            "email": "email@abcd.com",
            "password": "abcd@123"
        },
        LoginAdminUnsuccess: {
            "success" : false,
            "statusMessage" : "401 : Unauthorized",
            "message" : "Admin Login Unsuccessful ! Please signup."
        },
        LoginAdminSuccess: {
            "success" : true,
            "statusMessage" : "200 : Ok",
            "message" : "Admin Login Successfully. Token will be valid till 2 hour",
            "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        },
        LoginAdminUnauthorize: {
            success : false,
            statusMessage : "403 : Forbidden",
            message : "Admin Invalid Email or Password"
        },
        CreateNewStudent: {
            "registrationId": 1,
            "firstName": "Tom",
            "lastName": "Hanks",
            "gender": "Male" / "Female",
            "email": "tom@abc.com",
            "password": "qwerty@123",
            "age": 25,
            "contactNumber": "304-332-4163",
            "address": "4580 Grasselli Street, Manchester, USA",
            "isActive": true
        },
        CreateNewStudentDbIssue: {
            "success" : false,
            "statusMessage" : "500 : Internal Server Error",
            "message" : "Database connection error ! Please check the data you are trying to add."
        },
        CreateNewStudentSuccess: {
            "success" : true,
            "statusMessage" : "201 : Created",
            "data": {
                "fieldCount": 0,
                "affectedRows": 1,
                "insertId": 0,
                "serverStatus": 2,
                "warningCount": 0,
                "message": "",
                "protocol41": true,
                "changedRows": 0
            }
        },
        GetAllStudentsByAdminFail: {
            success : false,
            statusMessage : "404 : Not Found",
            message : "No records present ! Please enter students data."
        },
        GetAllStudentsByAdminSuccess: {
            "success": true,
            "statusMessage": "200 : Ok",
            "data": [
                {
                    "registrationId": 1,
                    "firstName": "Tom",
                    "lastName": "Hanks",
                    "gender": "Male",
                    "email": "tom@abcd.com",
                    "age": 25,
                    "contactNumber": "91-00918-999",
                    "address": "3881 Granville Lane",
                    "isActive": 1
                },
                {
                    "registrationId": 2,
                    "firstName": "Micheal",
                    "lastName": "Clarke",
                    "gender": "Female",
                    "email": "mcl@ahii.com",
                    "age": 29,
                    "contactNumber": "973-501-1506",
                    "address": "3800 Owagner Lane",
                    "isActive": 0
                }
            ] 
        },
        UpdateStudentByAdmin: {
            "registrationId": 1,
            "firstName": "Tom",
            "lastName": "Hanks",
            "gender": "Male" / "Female",
            "email": "tom@abc.com",
            "password": "qwerty@123",
            "age": 25,
            "contactNumber": "304-332-4163",
            "address": "4580 Grasselli Street, Manchester, USA",
            "isActive": true
        },
        UpdateStudentSuccess: {
            success : true,
            statusMessage : "200 : Ok",
            message : "Updated Successfully"
        },
        DeleteStudentByAdmin: {
            "registrationId": 1,
            "isActive": true
        },
        DeleteStudentForbidden: {
            success : false,
            statusMessage : "403 : Forbidden",
            message : "Can not delete the entry ! Student is Active. Please update isActive flag before deleting the entry."
        },
        DeleteStudentSuccess: {
            success : true,
            statusMessage : "200 : Ok",
            message : "User deleted successfully"
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js')
})