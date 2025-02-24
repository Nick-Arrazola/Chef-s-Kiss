import React, { useState, useContext } from "react";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import { UserContext } from "../../UserContext";
import api from "../../utils/api";

const Profile = () => {
    const { user, setUser } = useContext(UserContext);  // Get user and setUser from context
    const [isEditingAboutMe, setIsEditingAboutMe] = useState(false);  // Track if in edit mode
    const [isEditingContact, setIsEditingContact] = useState(false);  // Track if in edit mode
    const [aboutMe, setAboutMe] = useState(user?.userInfo?.aboutMe || ""); // Local state for aboutMe
    const [contactInfo, setContactInfo] = useState(user?.userInfo?.contact || "");

    // Handle input changes
    const handleAboutMeChange = (event) => {
        setAboutMe(event.target.value);
    };

    const handleContactChange = (event) => {
        setContactInfo(event.target.value);
    };

    // Save changes to context
    const handleAboutMeSave = () => {
        //"temp" is an object that will hold the copy of "user's" contents, however, "aboutMe" will be updated with new value.
        let temp = {
            //"...user" copies everything inside "user" up until "userInfo", since that's something we want to change.
            ...user, // Create a new user object
            userInfo: {
                //Copying everything inside "userInfo" as we want it all the same up until "aboutMe", since we want to update it with new value.
                ...user.userInfo, // Copy userInfo properties
                aboutMe: aboutMe // Update aboutMe field
            }
        };
        //Using "setUser" to update "user" of the context inside "UserContext.js" with "temp"
        api.updateUser(user._id, temp);
        setUser(temp);
        setIsEditingAboutMe(false); // Exit edit mode
    };

    const handleContactSave = () => {
        //"temp" is an object that will hold the copy of "user's" contents, however, "aboutMe" will be updated with new value.
        let temp = {
            //"...user" copies everything inside "user" up until "userInfo", since that's something we want to change.
            ...user, // Create a new user object
            userInfo: {
                //Copying everything inside "userInfo" as we want it all the same up until "aboutMe", since we want to update it with new value.
                ...user.userInfo, // Copy userInfo properties
                contact: contactInfo // Update "contact" field
            }
        };
        api.updateUser(user._id, temp);
        //Using "setUser" to update "user" of the context inside "UserContext.js" with "temp"
        setUser(temp);
        setIsEditingContact(false); // Exit edit mode
    };

    // Prevent errors when user is null
    if (!user) {
        return (
            <Container className="my-5 background" style={{ padding: "30px" }}>
                <h2>Loading user data...</h2>
            </Container>
        );
    }

    return (
        <Container className="my-5 background" style={{ padding: "30px" }}>
            <Row>
                <Col md={4} className="text-center">
                    <Image
                        src={user.profileImage || "https://via.placeholder.com/200"}
                        roundedCircle
                        style={{ width: "200px", border: "5px solid #fff" }}
                    />
                    <h2 className="mt-3">{user.realname}</h2>
                    <p className="text-muted">@{user.username}</p>
                    <Button variant="primary" size="sm" className="mb-3">
                        Edit Profile
                    </Button>
                </Col>
                <Col md={8}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>About Me</h2>
                        {!isEditingAboutMe ? (
                            <Button variant="outline-primary" size="sm" onClick={() => setIsEditingAboutMe(true)}>Edit</Button>
                        ) : (
                            <Button variant="success" size="sm" onClick={handleAboutMeSave}>Save</Button>
                        )}
                    </div>

                    {!isEditingAboutMe ? (
                        <p>{user.userInfo?.aboutMe || "Write something about yourself here"}</p>
                    ) : (
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={aboutMe}
                            onChange={handleAboutMeChange}
                        />
                    )}

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h2>Contact Information</h2>
                        {!isEditingContact ? (
                            <Button variant="outline-primary" size="sm" onClick={() => setIsEditingContact(true)}>Edit</Button>
                        ) : (
                            <Button variant="success" size="sm" onClick={handleContactSave}>Save</Button>
                        )}
                        
                    </div>

                    {!isEditingContact ? (
                        <p>{user.userInfo?.contact || "Add your contact information here"}</p>
                    ) : (
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={contactInfo}
                            onChange={handleContactChange}
                        />
                    )}
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