import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Card, Col, Container, Row } from 'react-bootstrap';
import api from '../../utils/api';
import Comments from "../../components/comments"; // Import the Comments component

const View = () => {
  const [recipe, setRecipe] = useState(null);
  const [username, setUsername] = useState(""); // State to store the username
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const { id } = useParams();
  const defaultImage = "https://tse3.mm.bing.net/th?id=OIP.1LE1ubiBi3zlk7L-9tZFYAHaGw&pid=Api&P=0&h=180";

  useEffect(() => {
    // Fetch the recipe first
    api.getRecipeById(id)
      .then((res) => {
        
        const data = {
          _id: res._id,
          ...JSON.parse(res.data.data),
          //todo, this is returning undefined. Check backend and how it actually works. Get this working so that we can use the userID to display the user's username.
              userID: res.userID // Extract userID from the recipe
        };

        console.log(data);                                          //!Delete Later 

        setRecipe(data);

        // Fetch the username based on userID
        if (data.userID) {
          api.getUserById(data.userID)
            .then((userRes) => {
              setUsername(userRes.username || "Unknown Chef");
            })
            .catch((error) => console.error("Error fetching username:", error));
        }
      })
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  const buildURL = (filename) => `/api/images/${filename}`;

  const handleLike = () => {
    api.incrementLikes(id)
      .then(() => {
        api.getLikesCount(id)
          .then((res) => {
            setLikes(res.likes);
            setHasLiked(true);
          })
          .catch((error) => console.error("Error fetching likes count:", error));
      })
      .catch((error) => console.error("Error incrementing likes:", error));
  };

  return (
    <Container className="my-5">
      {recipe ? (
        <div>
          <Row>
            {/* Card for Name and Description */}
            <Col md={6}>
              <Card className="shadow-lg mb-4">
                <Card.Body>
                  <Card.Title><strong>Name:</strong> {recipe.name}</Card.Title>
                  <Card.Text>
                    <em>Recipe prepared by: {username}</em> {/* Display username */}
                  </Card.Text>
                  <Card.Img variant="top" src={recipe.image ? buildURL(recipe.image) : defaultImage} alt={recipe.name} style={{ maxWidth: '100%' }} />
                </Card.Body>
              </Card>
            </Col>

            {/* Card for Recipe Instructions */}
            <Col md={6}>
              <Card className="shadow-lg mb-4">
                <Card.Body>
                  <Card.Title><strong>Instructions:</strong></Card.Title>
                  <Card.Text style={{ whiteSpace: 'pre-line' }}>{recipe.description}</Card.Text>
                  <Button variant="primary" onClick={handleLike} disabled={hasLiked}>
                    {hasLiked ? "Kissed" : "Kiss"} ({likes})
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Button to go back to the home page */}
          <div className="text-center mt-4">
            <NavLink to="/home">
              <Button variant="warning">Back</Button>{' '}
            </NavLink>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default View;
