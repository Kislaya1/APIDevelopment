const pool = require("../../config/database")

module.exports = {
    createUser: (data, callback) => {
        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number) values(?,?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                "test@123",
                data.number
            ],
            (error, results, fields) => {
                if(error) 
                    return callback(error)
                return callback(null, results)
            }
        )
    },
    getUsers : callback => {
        pool.query(
            `select firstName, lastName, gender, email, password, number from registration`,
            [],
            (error, results, fields) => {
                if(error)
                    return callback(error)
                return callback(null, results)
            }
        )
    },
    getUserByUserId : (id, callback) => {
        pool.query(
            `select firstName, lastName, gender, email, password, number from registration where id = ?`,
            [id],
            (error, results, fields) => {
                if(error)
                    callback(error)
                return callback(null, results[0])
            }
        )
    },
    updateUser : (data, callback) => {
        pool.query(
            `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=?`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                "test@123",
                data.number,
                data.id
            ],
            (error, results, fields) => {
                if(error) 
                    return callback(error)
                return callback(null, results[0])
            }
        )
    },
    deleteUser : (data, callback) => {
        pool.query(
            `delete from registration where id = ?`,
            [
                data.id
            ],
            (error, results, fields) => {
                if(error) 
                    return callback(error)
                return callback(null, results[0])
            }
        )
    },
    getUsersByEmailId : (data, callback) => {
        pool.query(
            `select firstName, lastName, gender, email, password, number from registration where email = ?`,
            [data.email],
            (error, results, fields) => {
                if(error)
                    callback(error)
                return callback(null, results[0])
            }
        )
    }
}