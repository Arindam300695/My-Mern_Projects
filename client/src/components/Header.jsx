import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Image from 'react-bootstrap/Image';
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [admin, setAdmin] = useState(false);
    const productCount = useSelector(state => state.foodItemSlice.productCount);

    useEffect(() => {
        // checking if any user is logged in and if there is any token in the local storage
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.email === "ari1995@admin.com") setAdmin(true);
        if (token) setIsLoggedin(true);
    }, [isLoggedin])

    // logoutHandler function
    const logoutHandler = () => {
        setIsLoggedin(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("logged out successfully", {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        navigate("/");
    };
    return (
        <>
            <Navbar bg="success" expand="lg">
                <Container style={{ minHeight: "2rem" }}>
                    <NavLink className="navlink" to="/"><h2>
                        Mast-Food
                    </h2></NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {!isLoggedin && <NavLink className="navlink" to="/register">Register</NavLink>}
                            {!isLoggedin && <NavLink className="navlink" to="/login">Login</NavLink>}
                            {isLoggedin && admin && <NavLink className="navlink" to="/addFoodItem">Add Item</NavLink>}
                            {isLoggedin && <NavLink onClick={logoutHandler} className="navlink">Logout</NavLink>}
                            {isLoggedin && admin && <NavLink className="navlink" to="/editFoodItem">Edit Product</NavLink>}
                            {isLoggedin && <NavLink className="navlink" to="/cart">Cart <sup className='fs-5'>{productCount}</sup></NavLink>}
                            {isLoggedin && JSON.parse(localStorage.getItem("user") !== null) && <h1>
                                <Image src={JSON.parse(localStorage.getItem("user")).avatar} width="50px" roundedCircle />
                            </h1>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ToastContainer />
        </>
    )
}

export default Header