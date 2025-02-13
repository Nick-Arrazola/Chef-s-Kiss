import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import './style.intro.css'; // Import the CSS file

const LoginPage = () => {
    const baseURL = process.env.PUBLIC_URL;

    return (
        <Container className="mt-5 text-center intro-page">
            <Row className="mt-4">
                <Col>
                    <h1>Chef's Kiss</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img src={`${baseURL}/kissing-chef.png`} style={{ width: "600px", margin: "0 auto", display: "block" }} alt="Chef's Kiss Logo" />
                </Col>
                <p><strong>Certified *Muah*</strong></p>
            </Row>
            <Row className="mt-4">
                <Col>
                <Link to="/login">
                    <Button variant="primary" size="lg">
                    Login
                    </Button>
                </Link>
                <p><strong>Already have an account? Login!</strong></p>
                </Col>
                <Col>
                <Link to="/signup">
                    <Button variant="success" size="lg">
                    Sign Up
                    </Button>
                </Link>
                <p><strong>Don't have an account? Sign up!</strong></p>
                </Col>
                {/* <Col>
                <NavLink to="/home">
                    <Button variant="warning" size="lg">
                    Continue as guest
                    </Button>
                </NavLink>
                <p><strong>Straight to the action but no access to features</strong></p>
                </Col> */}
            </Row>
        </Container>
    );
};

export default LoginPage;

