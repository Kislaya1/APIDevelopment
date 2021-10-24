const { getStudentByStudentId,getStudentByEmailId,createNewAdmin,getAdminByEmailId,createNewStudent,getStudents,updateStudent,deleteStudent } = require("./service")
const { genSaltSync, hashSync, compareSync} = require("bcrypt")
const { sign } = require("jsonwebtoken")

module.exports = {
    /*================================ For Students ========================================================*/
    //Get Student Data using Student Id
    getStudentByStudentId : (req, res) => {
        /* 
            #swagger.tags = ['Student Api']
            #swagger.description = 'Get student data using student Id'
            #swagger.parameters['stdId'] = { description: 'Insert valid student Id', type: 'string' }
            #swagger.security = [{"Bearer": []}]
        */
        const stdId = req.params.stdId
        getStudentByStudentId(stdId, (err, results) => { 
            if(err){
                console.log(err)
                return
            }
            /* 
                #swagger.responses[404] = { 
                    schema: { $ref: "#/definitions/GetStudentByIdNotFound" }
                } 
            */
            else if(!results) {
                return res.status(404).json({
                    success : false,
                    statusMessage : "404 : Not Found",
                    message : "No Records Found ! Please contact your admin."
                })
            }
            /* 
                #swagger.responses[200] = { 
                    schema: { $ref: "#/definitions/GetStudentByIdSuccess" }
                } 
            */
            return res.status(200).json({
                success : true,
                statusMessage : "200 : Ok",
                data : results
            })
        })
    },
    //Login As Student
    loginStudent : (req, res) => {
        /* 
            #swagger.tags = ['Student Api']
            #swagger.description = 'Login as student' 
        */
        /* 
            #swagger.parameters['login student'] = {
               in: 'body',
               description: 'Login as student',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/LoginStd" }
        } */

        const body = req.body
        getStudentByEmailId(body.email, (err, results) => {
            if(err) 
                console.log(err)

        /* 
            #swagger.responses[401] = { 
               schema: { $ref: "#/definitions/LoginStdUnsuccess" }
            } 
        */

            if(!results)
                return res.status(401).json({
                    success : false,
                    statusMessage : "401 : Unauthorized",
                    message : "Student Login Unsuccessful ! No Records Found. Please contact your admin."
                });
            const result = compareSync(body.password, results.password)
            if(result) {
                results.password = undefined;
                const jsonwebtoken = sign({result : results}, process.env.SECRET_KEY, {expiresIn : "2h"})
        /*
            #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/LoginStdSuccess" }
            } 
        */
                return res.status(200).json({
                    success : true,
                    statusMessage : "200 : Ok",
                    message : "Student Login Successfully. Token will be valid till 2 hour",
                    token : jsonwebtoken
                })
            } 
        /*
           #swagger.responses[401] = { 
                schema: { $ref: "#/definitions/LoginStdInvalidDetails" }
            } 
        */
            else {
                return res.status(401).json({
                    success : true,
                    statusMessage : "401 : Unauthorized",
                    message : "Student Invalid Email or Password"
                })
            }
        })
    },

    /*================================ For Admin ========================================================*/
    //Get Student Data using Student Id
    getStudentByStudentIdByAdmin : (req, res) => {
        /* 
            #swagger.tags = ['Admin Api']
            #swagger.description = 'Get student data using student Id'
            #swagger.parameters['stdId'] = { description: 'Insert valid student Id' }
            #swagger.security = [{"Bearer": []}]
        */
        const stdId = req.params.stdId
        getStudentByStudentId(stdId, (err, results) => {
            if(err){
                console.log(err)
                return
            } 
        /*
            #swagger.responses[404] = { 
                schema: { $ref: "#/definitions/GetStudentByIdNotFoundAdmin" }
            }
        */
            else if(!results) {
                return res.status(404).json({
                    success : false,
                    statusMessage : "404 : Not Found",
                    message : "No Records Found ! Please create new record"
                })
            }
        /*
            #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/GetStudentByIdSuccessAdmin" }
            } 
        */
            return res.status(200).json({
                success : true,
                statusMessage : "200 : Ok",
                data : results
            })
        })
    },
    //Signup As Admin
    signupAdmin : (req, res) => {
    /* 
        #swagger.tags = ['Admin Api']
        #swagger.description = 'Signup as admin' 
    */
    /* 
        #swagger.parameters['signup admin'] = {
               in: 'body',
               description: 'Signup as admin',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/SignupAdmin" }
        } 
    */    
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        createNewAdmin(body, (err, results) => {
            if(err) {
                console.log(err)
        /*
            #swagger.responses[500] = { 
                schema: { $ref: "#/definitions/SignupAdminFailed" }
            } 
        */
                return res.status(500).json({
                    success : false,
                    statusMessage : "500 : Internal Server Error",
                    message : "Database connection error ! Please check the data you are trying to add."
                })
            }
        /*
            #swagger.responses[201] = { 
                schema: { $ref: "#/definitions/SignupAdminSuccess" }
            } 
        */
            return res.status(201).json({
                success : true,
                statusMessage : "Admin Signup Successfully ! Login using same credentials."
            })
        })
    },
    //Login As Admin
    loginAdmin : (req, res) => {
    /* 
        #swagger.tags = ['Admin Api']
        #swagger.description = 'Login as admin' 
    */
    /* 
        #swagger.parameters['login admin'] = {
               in: 'body',
               description: 'Login as admin',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/LoginAdmin" }
        } 
    */
        const body = req.body
        const email = body.email
        getAdminByEmailId(email, (err, results) => {
            if(err) 
                console.log(err)
    /*
        #swagger.responses[401] = { 
            schema: { $ref: "#/definitions/LoginAdminUnsuccess" }
        } 
    */
            if(!results)
                return res.status(401).json({
                    success : false,
                    statusMessage : "401 : Unauthorized",
                    message : "Admin Login Unsuccessful ! Please signup."
                });
            const result = compareSync(body.password, results.password)
            if(result) {
                results.password = undefined;
                const jsonwebtoken = sign({result : results}, process.env.SECRET_KEY, {expiresIn : "2h"})
    /*
        #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/LoginAdminSuccess" }
        } 
    */
                return res.status(200).json({
                    success : true,
                    statusMessage : "200 : Ok",
                    message : "Admin Login Successfully. Token will be valid till 2 hour",
                    token : jsonwebtoken
                })
            } 
    /*
        #swagger.responses[403] = { 
            schema: { $ref: "#/definitions/LoginAdminUnauthorize" }
        } 
    */        
            else {
                return res.status(403).json({
                    success : false,
                    statusMessage : "403 : Forbidden",
                    message : "Admin Invalid Email or Password"
                })
            }
        })
    },
    //Add New Student
    createNewStudent : (req, res) => {
    /* 
        #swagger.tags = ['Admin Api']
        #swagger.description = 'Create new student.'
        #swagger.security = [{"Bearer": []}]
    */
    /* 
        #swagger.parameters['create student'] = {
               in: 'body',
               description: 'Create new student. <b>\"Note : Registration Id can not be duplicate.\"</b>',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/CreateNewStudent" }
        } 
    */
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        createNewStudent(body, (err, results) => {
            if(err) {
                console.log(err)
    /*
        #swagger.responses[500] = { 
            schema: { $ref: "#/definitions/CreateNewStudentDbIssue" }
        } 
    */            
                return res.status(500).json({
                    success : false,
                    statusMessage : "500 : Internal Server Error",
                    message : "Database connection error ! Please check the data you are trying to add."
                })
            }
    /*
        #swagger.responses[201] = { 
            schema: { $ref: "#/definitions/CreateNewStudentSuccess" }
        } 
    */        
            return res.status(201).json({
                success : true,
                statusMessage : "201 : Created",
                data : results
            })
        })
    },
    //View All Students
    getStudents: (req, res) => {
    /* 
        #swagger.tags = ['Admin Api']
        #swagger.description = 'Get all students data'
        #swagger.security = [{"Bearer": []}]
    */
        getStudents((err, results) => {
            if(err){
                console.log(err)
                return
            }
            if(results.length === 0) {
            /*
                #swagger.responses[404] = { 
                    schema: { $ref: "#/definitions/GetAllStudentsByAdminFail" }
                } 
            */
                return res.status(404).json({
                    success : false,
                    statusMessage : "404 : Not Found",
                    message : "No records present ! Please enter students data."
                })
            }
            /*
                #swagger.responses[200] = { 
                    schema: { $ref: "#/definitions/GetAllStudentsByAdminSuccess" }
                } 
            */
            return res.status(200).json({
                success : true,
                statusMessage : "200 : Ok",
                data : results
            })
        })
    },
    //Update Single Student
    updateStudent : (req, res) => {
    /* 
        #swagger.tags = ['Admin Api']
        #swagger.description = 'Update single student record' 
    */
    /* 
        #swagger.parameters['update student'] = {
               in: 'body',
               description: 'Update student record',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/UpdateStudentByAdmin" }
        } 
    */
        const body = req.body
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        updateStudent(body, (err, results) => {
            if(err) {
                console.log(err)
                return;
            }
    /*
        #swagger.responses[200] = { 
            schema: { $ref: "#/definitions/UpdateStudentSuccess" }
        } 
    */
            return res.status(200).json({
                success : true,
                statusMessage : "200 : Ok",
                message : "Updated Successfully"
            })
        })
    },
    //Delete Single Student
    deleteStudent : (req, res) => {
    /* 
        #swagger.tags = ['Admin Api']
        #swagger.description = 'Delete single student record' 
    */
    /* 
        #swagger.parameters['delete student'] = {
               in: 'body',
               description: 'Delete student record',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/DeleteStudentByAdmin" }
        } 
    */
        const body = req.body
        deleteStudent(body, (err, results) => {
            if(err) {
                console.log(err)
                return
            }
            if (body.isActive) {
        /*
            #swagger.responses[403] = { 
                schema: { $ref: "#/definitions/DeleteStudentForbidden" }
            } 
        */
                return res.status(403).json({
                    success : false,
                    statusMessage : "403 : Forbidden",
                    message : "Can not delete the entry ! Student is Active. Please update isActive flag before deleting the entry."})
            }
        /*
            #swagger.responses[200] = { 
                schema: { $ref: "#/definitions/DeleteStudentSuccess" }
            } 
        */
            return res.status(200).json({
                success : true,
                statusMessage : "200 : Ok",
                message : "User deleted successfully"
            })
        })
    }
}