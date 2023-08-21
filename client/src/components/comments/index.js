import React, { useState } from 'react';

const Comments = ({ comments, onCommentSubmit }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      onCommentSubmit(newComment);
      setNewComment('');
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comments;