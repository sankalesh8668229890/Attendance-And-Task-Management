const mongoose = require('mongoose');

// Define the schema for the attendance record
const AttendanceSchema = new mongoose.Schema({
    employeeName: { type: String, required: true },
    date: { type: Date, required: true },
    clockIn: { type: Date },
    clockOut: { type: Date },
    notes: { type: String }
});

// Create the model for the attendance record
const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;