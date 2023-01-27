const express = require('express');
const mongoose = require('mongoose');
const attendanceModel = require("../model/attendance")

const app = express();

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

const updateAttendance = async (req, res) => {
    // Update the specified attendance record
    try {
        const employeeId = req.params.id;
        const data = req.body
        const updateAttendance = await attendanceModel.findByIdAndUpdate({ _id: employeeId }, { ...data }, { new: true })
        return res.status(200).send({ status: true, message: "Attendance updated successfully", data: updateAttendance })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const deleteAttendance = async (req, res) => {
    try {
        const employeeId = req.params.id
        const deleteEmployee = await attendanceModel.findByIdAndDelete({ _id: employeeId })
        return res.status(200).send({ status: true, message: "Attendance deleted successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { attendance, getAttendance, updateAttendance, deleteAttendance }