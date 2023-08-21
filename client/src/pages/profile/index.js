// import React, { useState, useEffect } from "react";
// import './style.css';

// const Profile = () => {
//   const [profilePicture, setProfilePicture] = useState('');

//   useEffect(() => {
//     const savedProfilePicture = localStorage.getItem('profilePicture');
//     if (savedProfilePicture) {
//       setProfilePicture(savedProfilePicture);
//     }
//   }, []);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.addEventListener('load', () => {
//         const imageData = reader.result;
//         localStorage.setItem('profilePicture', imageData);
//         setProfilePicture(imageData);
//       });
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <div id="placeholderContainer">
//         {profilePicture ? (
//           <img id="placeholderImage" src={profilePicture} alt="Profile Picture" />
//         ) : (
//           <div>No profile picture selected</div>
//         )}
//       </div>

//       <input type="file" id="uploadInput" onChange={handleImageUpload} />
//       {/* <button id="uploadButton">Upload Picture</button> */}
//     </div>
//   );
// }

// export default Profile;

import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = () => {
    const user = {
        name: "John Doe",
        username: "johndoe123",
        email: "johndoe@example.com",
        profileImage: "https://example.com/profile-image.jpg", // Replace with your image URL
    };

    return (
        <Container className="my-5">
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


