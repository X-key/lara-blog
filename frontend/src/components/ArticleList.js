import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) return <div className="loading">Loading articles...</div>;

  return (
    <div className="article-list">
      <h2>Latest Articles</h2>
      {articles.map(article => (
        <div key={article.id} className="article-card">
          <h3>
            <Link to={`/article/${article.id}`}>{article.title}</Link>
          </h3>
          <p className="article-meta">
            Published on {new Date(article.created_at).toLocaleDateString()} • 
            {article.comments_count} comments
          </p>
          <p className="article-content">
            {truncateContent(article.content)}
          </p>
          <Link to={`/article/${article.id}`} className="read-more">
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;