import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddArticle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/articles', formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  return (
    <div className="add-article">
      <Link to="/" className="back-link">← Back to Articles</Link>
      
      <h2>Add New Article</h2>
      
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows="10"
            value={formData.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        
        <button type="submit">Publish Article</button>
      </form>
    </div>
  );
};

export default AddArticle;