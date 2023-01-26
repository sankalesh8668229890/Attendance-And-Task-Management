const express = require('express');
const mongoose = require('mongoose');
const attendanceModel = require("../model/attendance")

const app = express();

// Connect to the MongoDB instance
mongoose.connect('mongodb://localhost/attendance', { useNewUrlParser: true });

// Define routes
const attendance = async (req, res) => {
    try {
        const data = req.body;
        const { employeeName, date, clockIn, clockOut, notes } = data;

        const result = await attendanceModel.create(data);
        return res.status(200).send({ status: true, message: "Attendance record created successfully", data: result });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const getAttendance = async (req, res) => {
    // Find all attendance records for the specified employee
    try {
        const employeeName = req.params.employeeName;
        const employee = await attendanceModel.find({ employeeName: employeeName })
        if (!employee) {
            return res.status(404).send({ status: false, message: "couldn't find employee" })
        }
        return res.status(200).send({ status: true, data: employee })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
app.put('/attendance/:id', (req, res) => {
    // Update the specified attendance record
    Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, attendance) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(attendance);
        }
    });
});

const updateAttendance = async (req, res) => {
    // Update the specified attendance record
   try {
    const employeeId = req.params.id;
    const data = req.body
    const updateAttendance = await attendanceModel.findByIdAndUpdate({ _id: employeeId }, { ...data }, { new: true })
    return res.status(200).send({status:true,message:"Attendance updated successfully",data:updateAttendance})
   } catch (error) {
    return res.status(500).send({status:false,message:error.message})
   }
}

app.delete('/attendance/:id', (req, res) => {
    // Delete the specified attendance record
    Attendance.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send('Attendance record deleted');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});


module.exports = { attendance, getAttendance }