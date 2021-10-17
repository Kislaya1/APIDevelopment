const pool = require("../../config/database")

module.exports = {
    /*================================ Student Services ========================================================*/
    //1. Get Single Student Record - Both Admin & Student
    getStudentByStudentId : (id, callback) => {
        pool.query(
            `select registrationId,firstName,lastName,gender,email,age,contactNumber,address,isActive from student_data where registrationId = ?`,
            [id],
            (error, results, fields) => {
                if(error)
                    callback(error)
                return callback(null, results[0])
            }
        )
    },
    //2. Login Student
    getStudentByEmailId : (email, callback) => {
        pool.query(
            `select email,password from student_data where email = ?`,
            [email],
            (error, results, fields) => {
                if(error)
                    callback(error)
                return callback(null, results[0])
            }
        )
    },
    /*================================ Admin Services ========================================================*/
    //1. Signup Admin
    createNewAdmin : (data, callback) => {
        pool.query(
            `insert into admin_data(email, password) values(?,?)`,
            [
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if(error) 
                    return callback(error)
                return callback(null, results)
            }
        )
    },
    //2. Login Admin
    getAdminByEmailId : (email, callback) => {
        pool.query(
            `select email,password from admin_data where email = ?`,
            [email],
            (error, results, fields) => {
                if(error)
                    callback(error)
                return callback(null, results[0])
            }
        )
    },
    //3. Add New Student
    createNewStudent : (data, callback) => {
        pool.query(
            `insert into student_data(registrationId,firstName,lastName,gender,email,password,age,contactNumber,address,isActive) values(?,?,?,?,?,?,?,?,?,?)`,
            [
                data.registrationId,
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.age,
                data.contactNumber,
                data.address,
                data.isActive
            ],
            (error, results, fields) => {
                if(error) 
                    return callback(error)
                return callback(null, results)
            }
        )
    },
    //4. View All Students
    getStudents : callback => {
        pool.query(
            `select registrationId,firstName,lastName,gender,email,age,contactNumber,address,isActive from student_data`,
            [],
            (error, results, fields) => {
                if(error)
                    return callback(error)
                return callback(null, results)
            }
        )
    },
    //5. Edit Student Record
    updateStudent : (data, callback) => {
        pool.query(
            `update student_data set registrationId=?, firstName=?, lastName=?, gender=?, email=?, password=?, age=?, contactNumber=?, address=?, isActive=? where registrationId=?`,
            [
                data.registrationId,
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.age,
                data.contactNumber,
                data.address,
                data.isActive,
                data.registrationId
            ],
            (error, results, fields) => {
                if(error) 
                    return callback(error)
                return callback(null, results[0])
            }
        )
    },
    //6. Delete Student Record
    deleteStudent : (id, callback) => {
        pool.query(
            `delete from student_data where registrationId = ?`,
            [id],
            (error, results, fields) => {
                if(error) 
                    return callback(error)
                return callback(null, results[0])
            }
        )
    }
}