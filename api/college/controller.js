const { getStudentByStudentId,getStudentByEmailId,createNewAdmin,getAdminByEmailId,createNewStudent,getStudents,updateStudent,deleteStudent } = require("./service")
const { genSaltSync, hashSync, compareSync} = require("bcrypt")
const { sign } = require("jsonwebtoken")

module.exports = {
    /*================================ For Students ========================================================*/
    //Get Student Data using Student Id
    getStudentByStudentId : (req, res) => {
        const stdId = req.params.stdId
        getStudentByStudentId(stdId, (err, results) => {
            if(err){
                console.log(err)
                return
            } else if(!results) {
                return res.status(404).json({
                    success : false,
                    statusMessage : "404 : Not Found",
                    message : "No Records Found ! Please contact your admin."
                })
            }
            return res.status(200).json({
                success : true,
                statusMessage : "200 : Ok",
                data : results
            })
        })
    },
    //Login As Student
    loginStudent : (req, res) => {
        const body = req.body
        getStudentByEmailId(body.email, (err, results) => {
            if(err) 
                console.log(err)
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
                return res.status(200).json({
                    success : true,
                    statusMessage : "200 : Ok",
                    message : "Student Login Successfully. Token will be valid till 2 hour",
                    token : jsonwebtoken
                })
            } else {
                return res.status(401).json({
                    success : true,
                    statusMessage : "401 : Unauthorized",
                    message : "Student Invalid Email or Password"
                })
            }
        })
    },
    /*================================ For Admin ========================================================*/
    //Signup As Admin
    signupAdmin : (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        createNewAdmin(body, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success : false,
                    statusMessage : "500 : Internal Server Error",
                    message : "Database connection error ! Please check the data you are trying to add."
                })
            }
            return res.status(201).json({
                success : true,
                statusMessage : "Admin Signup Successfully ! Login using same credentials."
            })
        })
    },
    //Login As Admin
    loginAdmin : (req, res) => {
        const body = req.body
        const email = body.email
        getAdminByEmailId(email, (err, results) => {
            if(err) 
                console.log(err)
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
                return res.status(200).json({
                    success : true,
                    statusMessage : "200 : Ok",
                    message : "Admin Login Successfully. Token will be valid till 2 hour",
                    token : jsonwebtoken
                })
            } else {
                return res.status(401).json({
                    success : true,
                    statusMessage : "401 : Unauthorized",
                    message : "Admin Invalid Email or Password"
                })
            }
        })
    },
    //Add New Student
    createNewStudent : (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        createNewStudent(body, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success : false,
                    statusMessage : "500 : Internal Server Error",
                    message : "Database connection error ! Please check the data you are trying to add."
                })
            }
            return res.status(201).json({
                success : true,
                statusMessage : "201 : Created",
                data : results
            })
        })
    },
    //View All Students
    getStudents: (req, res) => {
        getStudents((err, results) => {
            if(err){
                console.log(err)
                return
            }
            if(results.length === 0) {
                return res.status(404).json({
                    success : false,
                    statusMessage : "404 : Not Found",
                    message : "No records present ! Please enter students data."
                })
            }
            return res.status(200).json({
                success : true,
                statusMessage : "200 : Ok",
                data : results
            })
        })
    },
    //Update Single Student
    updateStudent : (req, res) => {
        const body = req.body
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        updateStudent(body, (err, results) => {
            if(err) {
                console.log(err)
                return;
            }
            return res.status(200).json({
                success : true,
                statusMessage : "200 : Ok",
                message : "Updated Successfully"
            })
        })
    },
    //Delete Single Student
    deleteStudent : (req, res) => {
        const body = req.body
        const registrationId = body.registrationId
        deleteStudent(registrationId, (err, results) => {
            if(err) {
                console.log(err)
                return
            }
            if (body.isActive) {
                return res.status(403).json({
                    success : false,
                    statusMessage : "403 : Forbidden",
                    message : "Can not delete the entry ! Student is Active. Please update isActive flag before deleting the entry."            })
            }
            return res.status(200).json({
                success : true,
                statusMessage : "200 : Ok",
                message : "User deleted successfully"
            })
        })
    }
}