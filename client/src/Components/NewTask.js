import Navbar from "./Navbar";

const { useState } = require("react");


const CreateTask = () => {
    const [task, setTask] = useState({
        taskTitle: '',
        taskDescription: '',
        assignedTo: ''
    });

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {

        const { taskTitle, taskDescription, assignedTo } = task

        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ taskTitle, taskDescription, assignedTo })
            });
            const result = await res.json();
            if (result.status) {
                alert("Task created successfully");
            } else {
                throw new Error("Unable to create task");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <div style={{ backgroundImage: 'url("https://th.bing.com/th/id/R.5d3c685cf0eb6a57f911dcb2de53eefb?rik=v0z8IVdexOFVYw&riu=http%3a%2f%2f4-real.de%2flib%2fimg%2fnew%2f01_home%2fservices_05_graphicediting.jpg&ehk=%2bdMp4CxjEJZuL2n6u23%2bv9xdSZNs%2f0D7wCtIVNpk5SY%3d&risl=&pid=ImgRaw&r=0")', height: '100vh', backgroundSize: 'cover' }}>
            <div>
                <Navbar />
            </div>
            <div className="container p-5 mt-4">
                <div className="col-lg-5 border mx-auto pt-4 shadow-lg p-3 mb-5 text-white bg-dark bg-gradient rounded">
                    <div className="text-center">
                        <h3>Add New Task</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="p-5">
                        <div className="form-group pb-3">
                            <label htmlFor="taskTitle">Task Title</label>
                            <input type="text" name="taskTitle" id="taskTitle" className="form-control" value={task.taskTitle} onChange={handleChange} />
                        </div>
                        <div className="form-group pb-3">
                            <label htmlFor="taskDescription">Task Description</label>
                            <input type="text" name="taskDescription" id="taskDescription" className="form-control" value={task.taskDescription} onChange={handleChange} />
                        </div>
                        <div className="form-group pb-3">
                            <label htmlFor="assignedTo">Assigned To</label>
                            <input type="text" name="assignedTo" id="assignedTo" className="form-control" value={task.assignedTo} onChange={handleChange} />
                        </div>
                        <div className="text-center pb-3">
                            <button type="submit" className="btn btn-secondary text-center mt-4">Create Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTask;