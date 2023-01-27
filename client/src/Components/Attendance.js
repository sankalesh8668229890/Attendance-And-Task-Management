import React from 'react'
import { useState, useEffect } from 'react';

export default function Attendance() {
   

    const [attendance, setAttendance] = useState([]);
    // useEffect(() => {
    //     fetch.get('/api/attendance')
    //         .then(res => setAttendance(res.data))
    //         .catch(err => console.log(err));
    // }, []);
    // const [attendance, setAttendance] = useState([]);
    // useEffect(() => {
    //     fetch('/api/attendance')
    //         .then(res => res.json())
    //         .then(data => setAttendance(data))
    //         .catch(err => console.log(err));
    // }, [])

    function calculateWeeklyWorkingHours(dayIn, dayOut) {
        const oneDay = 2460601000; // hours minutes seconds milliseconds
        const firstDate = new Date(dayIn);
        const secondDate = new Date(dayOut);
        const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        const diffhours = diffDays * 8; // assuming 8 hours per day
        return diffhours;
    }
    return (
        <div>
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Weekly Working Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map(record => (
                        <tr key={record._id}>
                            <td>{record.employee.name}</td>
                            <td>{calculateWeeklyWorkingHours(record.dayIn, record.dayOut)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
