import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import api from "../../utils/api";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            // Display error message to user
            console.log("Passwords do not match");
            return;
        }

        const userData = {
            "username": username,
            "password": password,
        }

        api.userSignUp(userData)
            .then(res => {
                navigate("/login");
            })
            .catch(err => {
                // Display error message to user
                console.log(err);
            })  
    };

    return (
        <Container className="mt-5 text-center">
            <Row>
                <Col>
                    <h1>Sign Up</h1>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label><strong>Username</strong></Form.Label>
                            <Form.Control type="text" value={username} onChange={handleUsernameChange} />
                        </Form.Group>
                        <div>
                            <p></p>
                        </div>
                        <Form.Group controlId="password">
                            <Form.Label><strong>Password</strong></Form.Label>
                            <Form.Control type="password" value={password} onChange={handlePasswordChange} />
                        </Form.Group>
                        <div>
                            <p></p>
                        </div>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label><strong>Confirm Password</strong></Form.Label>
                            <Form.Control type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                        </Form.Group>
                        <div>
                            <p></p>
                        </div>
                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <p>
                        <strong>
                            Already have an account?{" "}
                            <Link to="/login">
                                Log In
                            </Link>
                        </strong>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;