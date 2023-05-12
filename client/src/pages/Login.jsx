import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import Header from '../components/Header';
import Footer from '../components/Footer';

// base url
const baseUrl = 'https://mern-food-delivery-app-dy3f.onrender.com';

const Login = () => {
  const navigate = useNavigate();
  const [authCredentials, setAuthCredentials] = useState({
    email: "",
    password: "",
  })

  // submitHandler function
  const submitHandler = async (e) => {
    e.preventDefault();
    // sending the post request to the server
    const res = await axios.post(`${baseUrl}/auth/login`, authCredentials);
    localStorage.setItem("user", res.data.isRegistered ? JSON.stringify(res.data.isRegistered) : null);
    if (res.status === 201) toast.success(res.data.message, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    if (res.status === 200) toast.warning(res.data.message, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    if (res.status === 500) toast.error(res.data.message, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    if (res.data.message === "Login successful") {
      setAuthCredentials({
        email: "",
        password: "",
      });
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        navigate("/")
      }, 2000);
    }
  };

  return (
    <>
      <Header />
      <div style={{ minHeight: "80vh" }} className='mb-2'>
        <Container>
          <Form onSubmit={submitHandler} className='d-flex flex-column align-items-center justify-content-center gap-1 w-50 m-auto'>
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

export default Login