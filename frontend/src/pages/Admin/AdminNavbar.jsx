import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {

    const navigate = useNavigate();

    const clearSessions = () => {
        sessionStorage.clear();
        navigate('/', { replace: true });
    }

    return (
        <nav className="navbar bg-body-tertiary fixed navbar-expand-md mb-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/admins'}>Admin</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body text-center">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <NavLink to={'/admins'} className="nav-link" activeclassname="active" aria-current="page">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/create'} className="nav-link" activeclasname="active">Create</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={clearSessions} to={'/'} className="nav-link" activeclasname="active">Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AdminNavbar