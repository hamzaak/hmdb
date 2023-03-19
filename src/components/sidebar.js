import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './sidebar.css';

function Sidebar() {
    const currentRoute = useLocation().pathname;
    console.info(currentRoute);
    return (
        <div className="d-flex flex-sm-column flex-row flex-nowrap bg-dark align-items-center sticky-top">
            <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-3 align-items-center">
                <li className="nav-item">
                    <Link to="/" 
                        className={(currentRoute === '/' ? 'nav-link py-3 px-2 sidebar-link active-link': 'nav-link py-3 px-2 sidebar-link')} 
                        title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                        <i className="bi-house fs-2"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/likes" 
                        className={(currentRoute === '/likes' ? 'nav-link py-3 px-2 sidebar-link active-link': 'nav-link py-3 px-2 sidebar-link')} 
                        title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Likes">
                        <i className="bi-heart fs-2"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/search" 
                        className={(currentRoute === '/search' ? 'nav-link py-3 px-2 sidebar-link active-link': 'nav-link py-3 px-2 sidebar-link')} 
                        title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Search">
                        <i className="bi-search fs-2"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/popular" 
                        className={(currentRoute === '/popular' ? 'nav-link py-3 px-2 sidebar-link active-link': 'nav-link py-3 px-2 sidebar-link')} 
                        title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Popular">
                        <i className="bi-fire fs-2"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/stars" 
                        className={(currentRoute === '/stars' ? 'nav-link py-3 px-2 sidebar-link active-link': 'nav-link py-3 px-2 sidebar-link')} 
                        title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Stars">
                        <i className="bi-star fs-2"></i>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;