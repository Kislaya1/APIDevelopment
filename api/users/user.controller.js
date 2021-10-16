const { createUser, getUsers, getUserByUserId, updateUser, deleteUser } = require("./user.service")
const { genSaltSync, hashSync } = require("bcrypt")

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
            return res.status(200).json({
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
                return res.json({
                    success : 0,
                    message : "Record not found"
                })
            }
            return res.json({
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
                return res.json({
                    success : 0,
                    message : "Record not found"
                })
            }
            return res.json({
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
                return res.json({
                    success : 0,
                    message : "Failed to update user. Duplicate Entry Present"    
                })
            }
            return res.json({
                success : 1,
                message : "Updated Successfully"
            })
        })
    },
    deleteUser : (req, res) => {
        const data = req.body
        deleteUser(data, (err, results) => {
            if(err) {
                console.log(err)
                return
            }
            if(!results) {
                return res.json({
                    success : 0,
                    message : "Record not found"
                })
            }
            return res.json({
                success : 1,
                message : "User deleted successfully"
            })
        })
    }
}