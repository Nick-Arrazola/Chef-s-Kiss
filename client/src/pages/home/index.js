import React from "react";
import { Link } from "react-router-dom";
import './style.home.css';
import { useEffect, useState } from "react";
import api from "../../utils/api"
import { Button, Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";

var Home = function ScrollableDiv() {
  const [recipes, setRecipes] = useState([]);
  const defaultImage = "https://tse3.mm.bing.net/th?id=OIP.1LE1ubiBi3zlk7L-9tZFYAHaGw&pid=Api&P=0&h=180";
  
  useEffect(() => {
    // Fetch the recipe data from the backend when the component mounts.
    api.getAllRecipes()
      .then((res) => {
        console.log(res)
        const data = res.data.map(item => ({ id: item._id, ...JSON.parse(item.data) }));
        setRecipes(data)
      })
      .catch((error) => console.error("Error fetching recipes:", error));
    }, []);
    
  const buildURL = (filename) => {
    return `/api/images/${filename}`;
  };

  return (
    <>
      <>
        <Navbar>
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#link1">Popular</Nav.Link>
                <Nav.Link href="#link2">Newest</Nav.Link>
                <Nav.Link href="#link3">Filter</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="scrollable-container" style={{ height: "80vh" }}>
          <div className="scrollable-content">
            <Container>
              <h1>Recipes</h1>
              {/* {recipes.map((recipe) => (
                <div key={recipe._id} className="recipe-container">
                  <h3>{recipe.name}</h3>
                  temperary for now. Need to emply error handeling in backend for 
                  uploads with false name
                  {recipe.image && <img src={buildURL(recipe.image)} alt={recipe.name} />}
                  <p>{recipe.description}</p>
                </div>
              ))} */}
              <Row xs={1} md={3} className="g-4">
                {recipes.map((recipe) => (
                  <Col key={recipe._id}>
                    {/* <div className="recipe-container">
                      <h3>{recipe.name}</h3>
                      {recipe.image && <img src={buildURL(recipe.image)} alt={recipe.name} />}
                      <p>{recipe.description}</p>
                    </div> */}
                    <Card style={{ width: '19rem' }}>
                      <Card.Img variant="top" src={recipe.image ? buildURL(recipe.image) : defaultImage} alt={recipe.name} />
                      <Card.Body>
                        <Card.Title>{recipe.name}</Card.Title>
                        {/* <Card.Text>
                          {recipe.description}
                        </Card.Text> */}
                        {/* <Link to={`/recipe/${recipe._id}`}> */}
                        <Link to= {`/view-recipe/${recipe.id}`} >
                          <Button variant="primary">View Recipe</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </div>
      </>  
      <div>
        <div>
          <p></p>
        </div>
          <Link to="/recipe-post">
            <Button variant="warning">Upload a Recipe</Button>{''}
          </Link>
      </div>
    </>
  );
}

export default Home;
