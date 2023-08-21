import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import api from "../../utils/api";
import './style.css';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({
        username: null,
        password: null,
    });
    
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you can add your login logic, e.g., API call
        console.log("Username:", username);
        console.log("Password:", password);

        const userData = {
            "username": username,
            "password": password,
        }
        api.userLogIn(userData)
        .then(response => {
            if (response.status === 200) {
                navigate("/home");
            } else {
                // Handle other status codes if needed
            }
        })
        .catch(err => {
            const message = err.response.data.message;
            console.log("Error:", message); // Log the error message
            
            if (message === "incorrect password") {
                setValidation(prevState => ({
                    ...prevState,
                    password: message,
                }));
            }
            else {
                setValidation(prevState => ({
                    ...prevState,
                    username: message,
                }));
            }
        })  
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Card Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title as="h1">Login</Card.Title>
                        <Row className="justify-content-md-left" style={{textAlign: "left"}}> 
                            <Form>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>
                                        <strong>Username</strong>
                                    </Form.Label>
                                    <Form.Control
                                        className={validation.username && "test"}
                                        type="username"
                                        placeholder="username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                    {validation.username && <div style={{color: "red"}}>
                                        *{validation.username}
                                    </div>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>
                                        <strong>Password</strong>
                                    </Form.Label>
                                    <Form.Control
                                        className={validation.password && "test"}
                                        type="password"
                                        placeholder="password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    {validation.password && <div style={{color: "red"}}>
                                        *{validation.password}
                                    </div>}
                                </Form.Group>
                            </Form>
                        </Row>

                        <Button
                            variant="primary"
                            onClick= {handleSubmit}
                        >
                            Log In
                        </Button>
 
                    </Card.Body>
                        <Card.Footer> 
                            <strong>
                                Don't have an account?{" "}
                                <Link to="/signup">
                                    Sign Up
                                </Link>
                            </strong>
                        </Card.Footer>
                </Card>
            </Row>
        </Container>
        );
};

export default LoginForm;

