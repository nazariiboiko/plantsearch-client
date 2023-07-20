import React from 'react';
import './Admin.css';
import { Link } from "react-router-dom";

const AdminPanel = () => {

    return (
        <div className="container">
            <div className="rows">
                <div className="">
                    <ul className="navbar-nav center-box">
                        <li>
                        <Link to={`plant`}>
                            <button className="btn btn-primary admin-button" >   
                            Керування розсадами
                            </button>
                        </Link>
                        </li>
                        <li>
                        <Link to={`user`}>
                        <button className="btn btn-primary admin-button" >
                            Керування користувачами
                        </button>
                        </Link>
                        </li>
                        <li>
                        <Link to={`supplier`}>
                        <button className="btn btn-primary admin-button" >
                            Керування розсадниками
                        </button>
                        </Link>
                        </li>
                    </ul> 
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;