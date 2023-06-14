import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { doSignup } from "../../functions/authRequest";
import './ModalForm.css';


const ModalSignUpForm = ({ showModal, onClose }) => {
    
    
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name  == 'email') {
        setEmail(value);
      } 
        else if (name === 'login') {
        setLogin(value);
      } else if (name === 'password') {
        setPassword(value);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      doSignup({ email, login, password })
              .then(() => navigate('/'))
              .catch((error) => setErrorMsg(error.response.data.message));
  
          setLogin('');
          setPassword('');
          setEmail('');
          setErrorMsg('');
          window.location.reload();
          onClose();
    };
  
    if (!showModal) {
      return null;
    }
  
    return (
      <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title w-100 font-weight-bold">Sign up</h4>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close">
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body mx-3">
              <form onSubmit={handleSubmit}>

              <div className="md-form mb-5">
                  <i className="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    id="email"
                    className="validate"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                </div>

                <div className="md-form mb-5">
                  <i className="fa-solid fa-user"></i>
                  <input
                    type="login"
                    id="login"
                    className="validate"
                    name="login"
                    value={login}
                    onChange={handleInputChange}
                    placeholder="Username"
                  />
                </div>
  
                <div className="md-form mb-4">
                  <i className="fas fa-lock prefix grey-text"></i>
                  <input
                    type="password"
                    id="password"
                    className="validate"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    placeholder="Password"
                  />
                </div>
                
  
                <div className="modal-footer d-flex justify-content-center">
                  <button className="btn btn-default" type="submit">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ModalSignUpForm;