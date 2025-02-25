// Post.js
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import './style.css';
import { useContext } from "react";
import { UserContext } from "../../UserContext";

const Post = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState(false);
  const [recipeDescription, setRecipeDescription] = useState("");
  //Getting the currently logged in user's info from "UserContext"
  const { user }  = useContext(UserContext);

  const navigate = useNavigate();

  // Send a POST request to the backend API to store the recipe data.
  const uploadRecipe = (recipe) => {
    const body = {
      name: recipe.name, 
      data: JSON.stringify(recipe),
    };

    api.createRecipe(body).then(res => {
       console.log(res);                                            //!Delete Later
       navigate("/home");
     });
   };

  const uploadImage = (recipe, imageData) => {
    console.log(recipe);                                            //!Delete Later
    console.log(imageData);                                         //!Delete Later
    api.uploadImage(imageData)
    .then(res => {
      console.log(res);                                             //!Delete Later
      recipe.image = res.data.files[0].filename;
      uploadRecipe(recipe);
    })
    .catch(err => {
      console.log("image upload failed", err);
      console.error("image upload failed", err);
    }); 
  };
  
  const handleUpload = (event) => {
    event.preventDefault();

    if (!user) {
      alert("You must be logged in to post a recipe");
      return;
    } 

    const payload = {
      name: recipeName,
      image: recipeImage,
      description: recipeDescription,
      //Placing the currently logged in user's ID here so that viewers can know WHO made this recipe
      user: user._id,
    };
    if (recipeImage) {
      const imageFile = new FormData();
      imageFile.append("images", recipeImage);
      uploadImage(payload, imageFile)
    } 
    else {
      uploadRecipe(payload)
    }
  };


  const handleInput = (event) => {
    const id = event.target.id.split("-")[1];
    const type = event.target.type;
    const input = type==='file' ? event.target.files[0] : event.target.value;

    if (id === 'name') {
      setRecipeName(input);
    }
    else if (id === 'image') {
      setRecipeImage(input);
    }
    else if (id === 'description') {
      setRecipeDescription(input);
    }
    else {
      console.log("handleInput: No match to set state");
    }
  };

  return (
    <div className="post-container">
      <h1>Post a Recipe</h1>
      <form className="post-form">
        <input
          id="recipe-name"
          type="text"
          value={recipeName}
          onChange={handleInput}
          placeholder="Recipe Name"
        />
        <textarea
          id="recipe-description"
          value={recipeDescription}
          onChange={handleInput}
          placeholder="Recipe Description"
        ></textarea>
        <input
          id="recipe-image"
          type="file"
          onChange={handleInput}
        />
      </form>
      <div>
        <Button 
          variant="warning"
          onClick={handleUpload}
        >
          Post a recipe
        </Button>{' '}
      </div>
    </div>
  );
};

export default Post;