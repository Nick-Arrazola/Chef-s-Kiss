import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import api from "../../utils/api";
import './style.css';
import { useContext } from "react";
import { UserContext } from "./../../UserContext" 

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({
        username: null,
        password: null,
    });

    //getting the "setUser" that is provided from "UserContext"
    const { setUser } = useContext(UserContext);
    
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
        console.log("Username:", username);                                       //!Delete Later
        console.log("Password:", password);                                       //!Delete Later

        const userData = {
            "username": username,
            "password": password,
        }
        api.userLogIn(userData)
        .then(response => {
            if (response.status === 200) {
                console.log("User data received from backend:", response.data);                                                 //!Delete Later
                //Setting context to store "response.data" so that every child component of "App.js" can access "Username"
                //"response.data" is the whole user schema object returned, which also includes user's "ID"
                setUser(response.data);
                console.log("UserContext updated:", response.data);                                                             //!Delete Later
                navigate("/home");
            } else {
                console.log("Account does not exist");
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

