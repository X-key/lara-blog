import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    content: ''
  });

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/articles/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/articles/${id}/comments`, commentForm);
      setCommentForm({ author_name: '', content: '' });
      fetchArticle();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleInputChange = (e) => {
    setCommentForm({
      ...commentForm,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div className="loading">Loading article...</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="article-detail">
      <Link to="/" className="back-link">← Back to Articles</Link>
      
      <article className="article-full">
        <h1>{article.title}</h1>
        <p className="article-meta">
          Published on {new Date(article.created_at).toLocaleDateString()}
        </p>
        <div className="article-content">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      <section className="comments-section">
        <h2>Comments ({article.comments?.length || 0})</h2>
        
        {article.comments?.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <strong>{comment.author_name}</strong>
              <span className="comment-date">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="comment-content">{comment.content}</p>
          </div>
        ))}

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <h3>Add a Comment</h3>
          <div className="form-group">
            <input
              type="text"
              name="author_name"
              placeholder="Your Name"
              value={commentForm.author_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              placeholder="Your Comment"
              rows="4"
              value={commentForm.content}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit Comment</button>
        </form>
      </section>
    </div>
  );
};

export default ArticleDetail;