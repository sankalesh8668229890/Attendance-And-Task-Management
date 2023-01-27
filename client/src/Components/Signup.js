import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'


export default function Signup() {

    const navigate = useNavigate()
    const [state, setState] = useState({
        name: "",
        email: "",
        password: ""
        
    })

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const handleOnSubmit = async (event) => {

        const { name, email, password} = state;

        event.preventDefault()
        const response = await fetch("http://localhost:3000/register",
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ name, email, password})
            })

        const result = await response.json();
        console.log(result)
        if (result.status) {
            alert("User Created Successfully !")
            navigate("/login")
        } 
    }

    return (
        <div style={{ backgroundImage: 'url("https://pre00.deviantart.net/92ac/th/pre/f/2015/235/9/f/windows_7_black_login_background_by_jeaglej-d7a56l5.jpg")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>
            <div className='container mt-5 pt-5'>

                <form className='col-lg-5 border mx-auto pt-4 shadow-lg p-3 mb-5 bg-dark bg-gradient text-light rounded' onSubmit={handleOnSubmit}>
                    <div className='text-center'>
                        <h3>Sign up</h3>
                    </div>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label ps-2">Full Name</label>
                        <input onChange={handleChange} type="name" className="form-control" name="name" value={state.name} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label ps-2">Email address</label>
                        <input onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={state.email} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label ps-2">Password</label>
                        <input onChange={handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" value={state.password} />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="m-3 btn btn-primary bg-gradient">Submit</button>
                        <NavLink to="/login" className="m-3 btn btn-danger bg-gradient">Already a User </NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}
