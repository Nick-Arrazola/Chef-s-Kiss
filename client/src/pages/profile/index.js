import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './style.css'; // Import the CSS file

const Profile = () => {
    const user = {
        name: "John Doe",
        username: "johndoe123",
        email: "johndoe@example.com",
        profileImage: "https://example.com/profile-image.jpg", // Replace with your image URL
    };

    return (
        <Container className="my-5 background" style={{padding: "30px"}}>
            <Row>
                <Col md={4} className="text-center">
                    <Image src={user.profileImage} roundedCircle style={{ width: "200px", border: "5px solid #fff" }} />
                    <h2 className="mt-3">{user.name}</h2>
                    <p className="text-muted">@{user.username}</p>
                    <Button variant="primary" size="sm" className="mb-3">
                        Edit Profile
                    </Button>
                </Col>
                <Col md={8}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>About Me</h2>
                        <Button variant="outline-primary" size="sm">
                            Edit
                        </Button>
                    </div>
                    <p>
                        Hi, I'm John Doe. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis vestibulum
                        ligula, non vulputate nunc facilisis non. Curabitur accumsan justo a consectetur convallis.
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h2>Contact Information</h2>
                        <Button variant="outline-primary" size="sm">
                            Edit
                        </Button>
                    </div>
                    <p><strong>Email:</strong> {user.email}</p>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className="text-center">
                    <Link to="/home">
                        <Button variant="secondary">Back to Home</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;


