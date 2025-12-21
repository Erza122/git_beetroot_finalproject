import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import './App.css';



const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));

const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="footer">
          <div className="footer-content">
            <p>
              © 2024 <span className="footer-brand">WallSearch</span>. 
              Powered by <a href="https://wallhaven.cc" target="_blank" rel="noopener noreferrer">Wallhaven API</a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
