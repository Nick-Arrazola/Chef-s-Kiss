import React, { useEffect, useState, useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Card, Col, Container, Row } from 'react-bootstrap';
import api from '../../utils/api';
import Comments from "../../components/comments"; // Import the Comments component
import { UserContext } from '../../UserContext';


// TODO Comment up how all of this works, so that we can better understand
const View = () => {
  const [recipe, setRecipe] = useState(null);
  const [username, setUsername] = useState(""); // State to store the username
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const { id } = useParams();
  const defaultImage = "https://tse3.mm.bing.net/th?id=OIP.1LE1ubiBi3zlk7L-9tZFYAHaGw&pid=Api&P=0&h=180";

  useEffect(() => {
    // Fetch the recipe first
    api.getRecipeById(id)
      .then((res) => {
        console.log("Raw API Response:", res.data); // Debugging
  
        let parsedData;
        
        try {
          parsedData = JSON.parse(res.data.data); // Ensure it's an object
        } catch (error) {
          console.error("Error parsing recipe data:", error);
          return;
        }
  
        console.log("Parsed Data:", parsedData); // Debugging
  
        const recipeData = {
          _id: res.data._id,
          name: res.data.name,
          description: parsedData.description, // Now safely accessing description
          image: parsedData.image || null, // Extract the image from the data field
          userID: parsedData.user, // Extract userID from the data field
        };
  
        setLikes(res.data.likes);
        setRecipe(recipeData);
  
        // Fetch the username based on userID
        if (recipeData.userID) {
          api.getUserById(recipeData.userID)
            .then((userRes) => {
              console.log("User Response:", userRes); // Debugging
              setUsername(userRes.data.username || "Unknown Chef");
            })
            .catch((error) => console.error("Error fetching username:", error));
        }
      })
      .catch((error) => console.error("Error fetching recipe:", error));

    //Checking if current logged-in user has liked this recipe before
    if (user?.userInfo?.likedRecipes?.includes(id)) {
      setHasLiked(true);
    }
  }, [id, user]);

  

  const buildURL = (filename) => `/api/images/${filename}`;

  const handleLike = () => {
    if (!user) {
      console.error("User not found");
      return;
    }

    //TODO working on this. Trying to make it so recipe ID saves to user's recipe's liked list. Having trouble making it work. 
    api.incrementLikes(id)
      .then((res) => {
        setLikes(res.data.likes);  // Update UI immediately
        setHasLiked(true);

        // Update the user's likedRecipes array in context
        const updatedUser = {
          ...user,
          userInfo: {
            ...user.userInfo,
            likedRecipes: [...user.userInfo.likedRecipes, id] // Add recipe ID
          }
        };

        //Recipe is being saved into the UpdatedUser object
        console.log(updatedUser);                                                                    //!Delete Later

        setUser(updatedUser); // Update context

        //! Problem is most likely coming from here since it UserContext is saving the recipe but the backend isn't
        api.updateUser(user._id, updatedUser); // Saving updated user with newly liked recipe to backend
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
                    <em>
                      Recipe prepared by: 
                      <NavLink to={`/uploader/${recipe.userID}`} className="text-primary" style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                          {username}
                      </NavLink>
                    </em> {/* Display username */}
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
                  {/* When "kiss" button is clicked, the function "handleLike" is called and "hasLiked" variable is change to display "kissed". 
                    The button is also dissable so we cannot further like the recipe, since it should be one like per user per recipe.*/}
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
