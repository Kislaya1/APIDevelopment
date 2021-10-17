const { getStudentByStudentId, loginStudent, signupAdmin, loginAdmin, createNewStudent, getStudents, updateStudent, deleteStudent } = require("./controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

/*================================ Student Router ========================================================*/
router.post("/student/login", loginStudent)
router.get("/student/record/:stdId", checkToken , getStudentByStudentId)

/*================================ Admin Router ========================================================*/
router.post("/admin/signup", signupAdmin)
router.post("/admin/login", loginAdmin)
router.post("/admin/create/student/record", checkToken, createNewStudent)
router.get("/admin/record/:stdId", checkToken , getStudentByStudentId)
router.get("/admin/student/records", checkToken, getStudents)
router.patch("/admin/edit/student/record", checkToken, updateStudent)
router.delete("/admin/delete/student/record", checkToken, deleteStudent)

module.exports = router;