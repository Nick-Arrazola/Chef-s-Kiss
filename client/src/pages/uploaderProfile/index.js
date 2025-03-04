import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import api from "../../utils/api";

// TODO Comment up how all of this works, so that we can better understand
const UploaderProfile = () => {
    const { userID } = useParams(); // Get userID from URL
    const [uploader, setUploader] = useState(null);

    useEffect(() => {
        api.getUserById(userID)
            .then((res) => {
                setUploader(res.data);
            })
            .catch((error) => console.error("Error fetching uploader profile:", error));
    }, [userID]);

    if (!uploader) {
        return (
            <Container className="my-5">
                <h2>Loading uploader data...</h2>
            </Container>
        );
    }

    return (
        <Container className="my-5 background" style={{ padding: "30px" }}>
            <Row>
                <Col md={4} className="text-center">
                    <Image
                        src={uploader.profileImage || "https://via.placeholder.com/200"}
                        roundedCircle
                        style={{ width: "200px", border: "5px solid #fff" }}
                    />
                    <h2 className="mt-3">{uploader.realname}</h2>
                    <p className="text-muted">@{uploader.username}</p>
                </Col>
                <Col md={8}>
                    <h2>About Me</h2>
                    <p>{uploader.userInfo?.aboutMe || "This user hasn't written about themselves yet."}</p>

                    <h2>Contact Information</h2>
                    <p>{uploader.userInfo?.contact || "No contact information provided."}</p>
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

export default UploaderProfile;