import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [currentUser, setCurrentUser] = useState({
        name: "",
        clockIn: "",
        clockOut: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/employees');
                const data = await res.json();
                setEmployees(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/attendance', {
                method: 'POST',
                body: JSON.stringify({
                    name: currentUser.name,
                    clockIn: currentUser.clockIn,
                    clockOut: currentUser.clockOut
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log(data);
            if(data.status){
                alert(`data updated`)
                navigate("/dashboard")
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div style={{ backgroundImage: 'url("https://thumbs.dreamstime.com/z/attendance-gold-text-black-background-d-rendered-royalty-free-stock-picture-image-can-be-used-online-website-banner-87918437.jpg")', height: '100vh', backgroundSize: 'cover' }}>
            <div>
                <Navbar />
            </div>
            <div className="container">
                <div className="border mx-auto pt-4 shadow-lg p-3 mb-5 text-white bg-dark bg-gradient rounded">
                    <h1 className="text-center mb-3">Dashboard</h1>
                    <div className="row">
                        <div className="col-6">
                            <h2 className='ps-5 ms-5'>Clock In/Out</h2>
                            <form onSubmit={handleSubmit} className="m-5 col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={currentUser.name}
                                        onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="clockIn">Clock In</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="clockIn"
                                        value={currentUser.clockIn}
                                        onChange={(e) => setCurrentUser({ ...currentUser, clockIn: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="clockOut">Clock Out</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="clockOut"
                                        value={currentUser.clockOut}
                                        onChange={(e) => setCurrentUser({ ...currentUser, clockOut: e.target.value })}
                                    />
                                </div>
                                <div className="text-center pb-3">
                                    <button type="submit" className="btn btn-secondary text-center mt-4">Submit</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <h2>Employee List</h2>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className='text-light'>Name</th>
                                        <th className='text-light'>Clock In</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee.name}>
                                            <td>{employee.name}</td>
                                            <td>{employee.clockIn}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard; 