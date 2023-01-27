import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

export default function Login() {

    const navigate = useNavigate()
    const [state, setState] = useState({
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

        const { email, password } = state;

        event.preventDefault()
        const response = await fetch("http://localhost:3000/login",
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

        const result = await response.json();
        console.log(result.data.token)
        if (result.status) {
            alert("User logged in Successfully !")
            localStorage.setItem("userId", JSON.stringify(result.data.userId))
            localStorage.setItem("authToken", JSON.stringify(result.data.token))
            navigate("/attendance")
        } else {
            alert("User credential are incorrect !")
            navigate("/login")
        }


    }

    return (
        <div style={{ backgroundImage: 'url("https://pre00.deviantart.net/92ac/th/pre/f/2015/235/9/f/windows_7_black_login_background_by_jeaglej-d7a56l5.jpg")', height: '100vh', backgroundSize: 'cover' }}>
            <div>
                <Navbar />
            </div>
            <div className='container p-5 mt-5 pt-5'>
                <form className='col-lg-5 border mx-auto pt-4 shadow-lg p-3 mb-5 bg-dark bg-gradient text-light rounded' onSubmit={handleOnSubmit}>
                    <div className='text-center'>
                        <h3>Log in</h3>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label ps-2">Email address</label>
                        <input onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={state.email} placeholder="Enter your Email" />
                        <div className='text-center'>We'll never share your email with anyone else.</div>
                    </div>

                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label ps-2">Password</label>
                        <input onChange={handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" value={state.password} placeholder="Enter your Password" />
                    </div>

                    <div className='text-center'>
                        <button type="submit" className="m-3 btn btn-primary bg-gradient">Login</button>
                        <NavLink to="/signup" className="m-3 btn btn-danger bg-gradient">Create New Account</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}
