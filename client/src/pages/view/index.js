import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Card, Col, Container, Row } from 'react-bootstrap';
import api from '../../utils/api';
import Comments from "../../components/comments"; // Import the Comments component

const View = () => {
  const [recipe, setRecipe] = useState(null);
  const [likes, setLikes] = useState(0); // State for the likes count
  const [hasLiked, setHasLiked] = useState(false); // State to track whether the user has liked
  // const [comments, setComments] = useState([]); // Set an empty array as default value for comments

  const { id } = useParams();
  const defaultImage = "https://tse3.mm.bing.net/th?id=OIP.1LE1ubiBi3zlk7L-9tZFYAHaGw&pid=Api&P=0&h=180";

  useEffect(() => {
    api.getRecipeById(id)
      .then((res) => {
        // creating object that includes the item's id and the parsed info of res.data
        const data = {
          _id: res._id,
          ...JSON.parse(res.data.data)
        };

        // use the data object to set it as the recipe
        setRecipe(data);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  const buildURL = (filename) => {
    return `/api/images/${filename}`;
  };

  const handleLike = () => {
    // Send a POST request to the backend to increment likes
    api.incrementLikes(id)
      .then(() => {
        // Fetch the updated likes count from the backend
        api.getLikesCount(id)
          .then((res) => {
            // Update the local likes count and hasLiked state
            setLikes(res.likes);
            setHasLiked(true);
          })
          .catch((error) => console.error("Error fetching likes count:", error));
      })
      .catch((error) => console.error("Error incrementing likes:", error));
  };

  // const handleCommentSubmit = (comment) => {
  //   // Add the comment to the backend
  //   api.addComment(id, comment)
  //     .then(() => {
  //       // Reload the recipe with the updated comment
  //       api.getRecipeById(id)
  //         .then((res) => {
  //           const data = {
  //             _id: res._id,
  //             ...JSON.parse(res.data.data),
  //           };

  //           setRecipe(data);
  //           setComments(data.comments);
  //         })
  //         .catch((error) => console.error('Error fetching recipe:', error));
  //     })
  //     .catch((error) => console.error('Error adding comment:', error));
  // };

  return (
    <Container className="my-5">
      {/* Checking if recipe is actually true */}
      {recipe ? (
        <div>
          <Row>
            {/* Card for Name and Description */}
            <Col md={6}>
              <Card className="shadow-lg mb-4">
                <Card.Body>
                  <Card.Title><strong>Name:</strong> {recipe.name}</Card.Title>
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
                  {/* "Like" button */}
                  <Button variant="primary" onClick={handleLike} disabled={hasLiked}>
                    {hasLiked ? "Kissed" : "Kiss"} ({likes})
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* <Comments comments={recipe.comments} onCommentSubmit={handleCommentSubmit} /> */}

          {/* Button to go back to the home page */}
          <div className="text-center mt-4">
            <NavLink to="/home">
              <Button variant="warning">
                Back
              </Button>{' '}
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
