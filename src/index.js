import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './index.css';
import Sidebar from './components/sidebar';
import Home from './components/home';
import Likes from './components/likes';
import Search from './components/search';
import Popular from './components/popular';
import Stars from './components/stars';
import reportWebVitals from './reportWebVitals';

const Routing = () => {
  return(
    <Router>
       <div className="container-fluid">
        <div className="row">
          <div className="col-sm-auto bg-dark sticky-top">
            <Sidebar />
          </div>
          <div className='col-sm p-3 min-vh-100'>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/likes" element={<Likes />} />
              <Route path="/search" element={<Search />} />
              <Route path="/popular" element={<Popular />} />
              <Route path="/stars" element={<Stars />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
