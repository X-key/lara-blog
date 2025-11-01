import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import AddArticle from './components/AddArticle';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>Simple Blog</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/add-article">Add Article</a>
          </nav>
        </header>
        
        <main className="container">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/add-article" element={<AddArticle />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;