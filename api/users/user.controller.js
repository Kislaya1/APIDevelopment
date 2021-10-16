const { createUser, getUsers, getUserByUserId, updateUser, deleteUser, getUsersByEmailId } = require("./user.service")
const { genSaltSync, hashSync, compareSync} = require("bcrypt")
const { sign } = require("jsonwebtoken")

module.exports = {
    createUser : (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        createUser(body, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error"
                })
            }
            return res.status(201).json({
                success : 1,
                data : results
            })
        })
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id
        getUserByUserId(id, (err, results) => {
            if(err){
                console.log(err)
                return
            }
            if(!results) {
                return res.status(404).json({
                    success : 0,
                    message : "Record not found"
                })
            }
            return res.status(200).json({
                success : 1,
                data : results
            })
        })
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err){
                console.log(err)
                return
            }
            if(results.length === 0) {
                return res.status(404).json({
                    success : 0,
                    message : "Record not found"
                })
            }
            return res.status(200).json({
                success : 1,
                data : results
            })
        })
    },
    updateUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        updateUser(body, (err, results) => {
            if(err) {
                console.log(err)
                return;
            }
            if(!results) {
                return res.status(400).json({
                    success : 0,
                    message : "Failed to update user. Duplicate Entry Present"    
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Updated Successfully"
            })
        })
    },
    deleteUser : (req, res) => {
        const data = req.body
        const isAdmin = req.body.isAdmin
        deleteUser(data, (err, results) => {
            if(err) {
                console.log(err)
                return
            }
            if(!results) {
                return res.status(404).json({
                    success : 0,
                    message : "Record not found"
                })
            }
            if(isAdmin) {
                return res.status(405).json({
                    success : 0,
                    message : "You are not allowed to delete this entry. Please try using different data."
                })
            }
            return res.status(200).json({
                success : 1,
                message : "User deleted successfully"
            })
        })
    },
    login : (req, res) => {
        const body = req.body
        getUsersByEmailId(body.email, (err, results) => {
            if(err) 
                console.log(err)
            if(!results)
                return res.status(401).json({
                    success : 0,
                    message : "Login Unsuccessful ! Data not present w.r.t the email id, please signup."
                });
            const result = compareSync(body.password, results.password)
            if(result) {
                results.password = undefined;
                const jsonwebtoken = sign({result : results}, process.env.SECRET_KEY, {expiresIn : "1h"})
                return res.status(200).json({
                    success : 1,
                    message : "Login Successfully. Token will be valid till 1 hour",
                    token : jsonwebtoken
                })
            } else {
                return res.status(401).json({
                    success : 0,
                    message : "Invalid email or password"
                })
            }
        })

    }
}