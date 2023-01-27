const express = require('express')
const {newTask,updateTask,deleteTask} = require("../controller/taskController")
const {attendance,getAttendance,updateAttendance,deleteAttendance} = require("../controller/attendanceController")
const {createUser,login}= require ("../controller/userController")
const cors = require('cors');
const router = express.Router();

router.use(cors())

// userApi
router.post("/register",createUser)
router.post("/login",login)


// Attendance Api
router.post("/attendance",attendance)
router.get("/attendance/:employeeName",getAttendance)
router.put("/attendance/:id",updateAttendance)
router.delete("/attendance/:id",deleteAttendance)


// task Api
router.post("/task",newTask)
router.put("/task/:id",updateTask)
router.delete("/task/:id",deleteTask)



router.all('/*', (req, res) =>
 { 
    return res.status(400).send({ status: false, message: "Endpoint Is Incorrect" }) 
})

module.exports = router;