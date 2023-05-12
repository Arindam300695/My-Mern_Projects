import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import Footer from '../components/Footer';

// base url
const baseUrl = 'https://mern-food-delivery-app-dy3f.onrender.com';

const Registration = () => {
    const [authCredentials, setAuthCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        avatar: "",
    })

    // submitHandler function
    const submitHandler = async (e) => {
        e.preventDefault();
        // sending the post request to the server
        const res = await axios.post(`${baseUrl}/auth/register`, authCredentials);
        if (res.status === 201) toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        if (res.status === 200) toast.warning(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        if (res.status === 500) toast.error(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        if (res.data.message === "user created successfully") setAuthCredentials({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            address: "",
            avatar: "",
        })
    };

    return (
        <>
            <Header />
            <div style={{ minHeight: "80vh" }} className='mb-2'>
                <Container>
                    <Form onSubmit={submitHandler} className='d-flex flex-column align-items-center justify-content-center gap-1 w-50 m-auto'>

                        {/* name field */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control className='text-center' type="text" placeholder="John Doe" required value={authCredentials.name} onChange={(e) => { setAuthCredentials({ ...authCredentials, name: e.target.value }) }} />
                        </Form.Group>

                        {/* email field */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control className='text-center' type="email" placeholder="name@example.com" required value={authCredentials.email} onChange={(e) => { setAuthCredentials({ ...authCredentials, email: e.target.value }) }} />
                        </Form.Group>

                        {/* password field */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className='text-center' type="password" placeholder="password" required value={authCredentials.password} onChange={(e) => { setAuthCredentials({ ...authCredentials, password: e.target.value }) }} />
                        </Form.Group>

                        {/* confirm password field */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control className='text-center' type="password" placeholder="password" required value={authCredentials.confirmPassword} onChange={(e) => { setAuthCredentials({ ...authCredentials, confirmPassword: e.target.value }) }} />
                        </Form.Group>

                        {/* address field */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label>Address</Form.Label>
                            <Form.Control className='text-center' type="text" placeholder="California, USA" required value={authCredentials.address} onChange={(e) => { setAuthCredentials({ ...authCredentials, address: e.target.value }) }} />
                        </Form.Group>

                        {/* avatar field */}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Choose Avatar</Form.Label>
                            <Form.Control className='text-center' type="file" onChange={(e) => {
                                const reader = new FileReader();
                                reader.readAsDataURL(e.target.files[0]);
                                reader.onloadend = () => {
                                    setAuthCredentials({ ...authCredentials, avatar: reader.result })
                                };
                            }} />
                        </Form.Group>

                        {/* submit button */}
                        <button className='btn btn-success'>Submit</button>

                    </Form>
                    <ToastContainer />
                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Registration