const express = require('express')
const {newTask,updateTask,deleteTask} = require("../controller/taskController")
const {attendance,getAttendance} = require("../controller/attendanceController")
const router = express.Router();

router.use(cors())

// Attendance Api
router.post("/attendance",attendance)
router.get("/attendance/:employeeName",getAttendance)

// task Api
router.post("/task",newTask)
router.put("/task/:id",updateTask)
router.delete("/task/:id",deleteTask)



router.all('/*', (req, res) =>
 { 
    return res.status(400).send({ status: false, message: "Endpoint Is Incorrect" }) 
})

module.exports = router;