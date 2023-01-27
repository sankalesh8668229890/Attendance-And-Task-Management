import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function AttendanceForm() {
    const [employeeName, setEmployeeName] = useState('');
    const [date, setDate] = useState('');
    const [clockIn, setClockIn] = useState('');
    const [clockOut, setClockOut] = useState('');
    const [notes, setNotes] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Make a post request to the attendance API
        // with the form data
        const response = await fetch("http://localhost:3000/attendance", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ employeeName, date, clockIn, clockOut, notes })
        })
        const result = await response.json();
        if(result.status){
            alert(`Welcome ${employeeName}`)
            navigate("/homepage")
        }
    };

    return (
        <div style={{ backgroundImage: 'url("https://thumbs.dreamstime.com/z/attendance-gold-text-black-background-d-rendered-royalty-free-stock-picture-image-can-be-used-online-website-banner-87918437.jpg")', height: '100vh', backgroundSize: 'cover' }}>
            <div>
                <Navbar />
            </div>
            <div className="container p-5 mt-4">
                <div className="col-lg-5 border mx-auto pt-4 shadow-lg p-3 mb-5 text-white bg-dark bg-gradient rounded">
                    <div className="text-center">
                        <h3>Mark Your Attendance</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="employeeName">Employee Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="employeeName"
                                value={employeeName}
                                onChange={(e) => setEmployeeName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="clockIn">Clock In</label>
                            <input
                                type="time"
                                className="form-control"
                                id="clockIn"
                                value={clockIn}
                                onChange={(e) => setClockIn(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="clockOut">Clock Out</label>
                            <input
                                type="time"
                                className="form-control"
                                id="clockOut"
                                value={clockOut}
                                onChange={(e) => setClockOut(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="notes">Notes</label>
                            <textarea
                                className="form-control"
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="text-center pb-3">
                            <button type="submit" className="btn btn-secondary text-center mt-4">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AttendanceForm;