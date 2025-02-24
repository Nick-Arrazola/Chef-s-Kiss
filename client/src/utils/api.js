import axios from "axios";

const api =  {
  // create new user accout, and also allow login from sign up for existing users 
  userSignUp: (userData) => axios.post("/api/users/signup", userData),
  // hash password and register user in database
  userLogIn: (userData) => axios.post("/api/users/login", userData),
  // Used to save any changes of user's info saved on mongo
  updateUser: (id, userData) => axios.put(`/api/users/${id}`, userData),
  // Getting user info attached to the given ID
  getUserById: (id) => axios.get("/api/users/" + id),
  // Saves a post to the database - not tested
  saveData: (id, userData) => axios.post("/api/" + id, userData),
  // deletes user account
  deleteUser: (id) => axios.delete("/api/users/" + id),
  // get all projects
  getAllRecipes: () => axios.get("/api/recipes"),
  //get single recipe
  getRecipeById: (id) => axios.get("/api/recipes/" + id),
  // create a recipe
  createRecipe: (recipe) => axios.post("/api/recipes", recipe),
  // edit a project
  editProject: (id, projectData) => axios.put("/api/projects/" + id, projectData),
  // edit a project
  deleteProject: (id) => axios.delete("/api/projects" + id),
  // upload an image
  uploadImage: (imageData) => axios.post("/api/images", imageData),
  // get an image by id
  loadImage: (fileName) => axios.get("/api/images/" + fileName),
  // add comments to recipe page
  addComment: (id, comment) => axios.post(`/api/recipes/${id}/comments`, { comment }),
  //increment likes for a recipe
  incrementLikes: (id) => axios.post(`/api/recipes/${id}/incrementLikes`),
  // incrementLikes: (id) => axios.post("/api/recipes/likes" + id), can this work as well????
  //get the current like count of recipe
  getLikesCount: (id) => axios.get(`/api/recipes/${id}/getLikeCount`)
};

export default api;