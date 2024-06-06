

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { UserTokenContext } from '../../Context/UserTokenContext';
import axios from 'axios';

export default function Navbar() {
    const { isLogin, setLogin } = useContext(UserTokenContext);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    function SignOut() {
        localStorage.removeItem('token');
        setLogin(false);
        navigate('/LogIn');
    }

    const handleDeleteAccount = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete('https://bookify-new.onrender.com/api/v1/auth/deleteAccount', {
                headers: {
                    token: token,
                    'Content-Type': 'application/json'
                }
            });
            alert(response.data.message);
            SignOut(); // Sign out the user after deleting the account
        } catch (error) {
            alert(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/Srchbook?keyword=${searchQuery}`);
    };

    return (
        <nav className="navbar navbar-expand-lg blueNavbar">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link whiteText" to='/'>Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle whiteText"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                DISCOVER
                            </a>
                            <ul className="dropdown-menu">
                                {/* <h3 className="d-flex justify-content-between w-75 mx-auto h3">Genres</h3>
                                <Link to='/History'><li><a className="dropdown-item" href="#">Bios & History</a></li></Link>
                                <Link to='/Habiba'><li><a className="dropdown-item" href="#">Fantasy</a></li></Link>
                                <Link to='/Literary'><li><a className="dropdown-item" href="#">Literary Fiction</a></li></Link>
                                <Link to='/Mystery'><li><a className="dropdown-item" href="#">Mystery & Thriller</a></li></Link>
                                <Link to='/Fiction'><li><a className="dropdown-item" href="#">Fiction</a></li></Link>
                                <Link to='/Science'><li><a className="dropdown-item" href="#">Science Fiction</a></li></Link> */}
                                <li><hr className="dropdown-divider" /></li>
                                <h3 className="d-flex justify-content-between w-75 mx-auto h3">Resources</h3>
                                <Link to='/Authors'><a className="dropdown-item blackText" href="#">Authors</a></Link>
                                <Link to='/Geners'><a className="dropdown-item blackText" href="#">Genres</a></Link>
                                <Link to='/profilePage'><a className="dropdown-item blackText" href="#">Profile</a></Link>
                                <Link to='/Test'><a className="dropdown-item blackText" href="#">WishList</a></Link>
                                <Link to='/AllLang'><a className="dropdown-item blackText" href="#">Languages</a></Link>
                                <Link to='/Test2'><a className="dropdown-item blackText" href="#">HistoryList</a></Link>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search by title, author or keywords"
                            aria-label="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="btn original-button" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        <li className="nav-item d-flex align-items-center">
                            <a href="https://www.facebook.com/"><i className='fa-brands fa-facebook mx-2'></i></a>
                            <a href="https://www.google.com.eg/"><i className='fa-brands fa-google mx-2'></i></a>
                            <a href="https://www.youtube.com/"><i className='fa-brands fa-youtube mx-2'></i></a>
                        </li>
                        {isLogin ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link cursor-pointer" onClick={SignOut}>SignOut</span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link cursor-pointer" onClick={handleDeleteAccount}>Delete Account</span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/Register'>Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/LogIn'>Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}