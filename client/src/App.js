import './App.css';
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Homepage from './Components/Homepage';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import CreateTask from './Components/NewTask';
import AttendanceForm from './Components/AttendanceForm';


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addTask" element={<CreateTask />} />
            <Route path="/attendance" element={<AttendanceForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
            
        </BrowserRouter>
  );
}

export default App;
