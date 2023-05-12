import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
    return (
        <>
            <Navbar bg="success" expand="lg" style={{ margin: 0, padding: "2rem" }}>
                <Container>
                    <h3 style={{ margin: "auto", color: "#FFF9DE" }}>&copy; Noob Coder</h3>
                </Container>
            </Navbar>
        </>
    )
}

export default Footer