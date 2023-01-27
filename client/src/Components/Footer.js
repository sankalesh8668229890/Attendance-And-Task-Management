import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
        <div><footer className="d-flex flex-wrap bg-dark bg-gradient justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <NavLink to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    <svg className="bi" width="30" height="24"><use></use></svg>
                </NavLink>
                <span className="text-muted">© 2023 Attendance and Task Management, Inc</span>
            </div>
        </footer></div>
    )
}
