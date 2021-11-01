const { getStudentByStudentId, loginStudent, signupAdmin, loginAdmin, createNewStudent, getStudents, updateStudent, deleteStudent, getStudentByStudentIdByAdmin } = require("./controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

/*================================ Student Router ========================================================*/
router.post("/student/login", loginStudent)
router.get("/student/record/:stdId", checkToken , getStudentByStudentId)

/*================================ Admin Router ========================================================*/
router.post("/admin/signup", signupAdmin)
router.post("/admin/login", loginAdmin)
router.post("/admin/student/create/record", checkToken, createNewStudent)
router.get("/admin/student/record/:stdId", checkToken , getStudentByStudentIdByAdmin)
router.get("/admin/student/records", checkToken, getStudents)
router.put("/admin/student/edit/record", checkToken, updateStudent)
router.delete("/admin/student/delete/record", checkToken, deleteStudent)

module.exports = router;