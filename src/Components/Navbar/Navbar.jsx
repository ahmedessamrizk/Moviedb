import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
import './NavbarRes.css';

export default function Navbar({currentUser , clrUserData , searchMovie}) {
return <>
    <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
            <a className="navbar-brand fw-bolder text-white" href="#">Noxe</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {currentUser? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link " to="/home">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/movies">Movies</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/tvshow">Tv Show</Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">People</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Networks</a>
                </li>
            </ul> : ''}
            
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                {
                    currentUser? <form className="d-flex me-4">
                    <input onChange={searchMovie} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                </form> : ''
                }
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-4 icons">
                    <li className='me-3'>
                        <i className="fa-brands fa-facebook"></i>
                    </li>
                    <li className='me-3'>
                    <i className="fa-brands fa-twitter"></i>
                    </li>
                    <li className='me-3'>
                    <i className="fa-brands fa-spotify"></i>
                    </li>
                    <li className='me-3'>
                    <i className="fa-brands fa-instagram"></i>
                    </li>
                </ul>
                {
                    currentUser? <li className="nav-item userControl">
                        
                        <span className="nav-link  d-inline user">{currentUser.first_name + " " + currentUser.last_name}</span>
                        <span onClick={clrUserData} className="nav-link d-inline logout user">Logut</span>
                    </li> : <>
                                <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Register</Link>
                                </li>
                            </>
                }
                
                
            </ul>
            </div>
        </div>
    </nav>
</>
}
