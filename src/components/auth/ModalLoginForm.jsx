import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { doLogin } from "../../functions/authRequest";
import Modal from '../ui/Modal/Modal';
import './ModalForm.css';


const ModalLoginForm = ({ activeObj, showSignUpModal }) => {
  const { activeSignIn, setActiveSignIn } = activeObj;
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'login') {
      setLogin(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doLogin({ login, password })
      .then(() => { navigate('/'); window.location.reload(); })
      .catch((error) => setErrorMsg(error.response.data.message));

    setLogin('');
    setPassword('');
    setErrorMsg('');
    setActiveSignIn(false);
  };

  const handleShowSignUpModal = () => {
    showSignUpModal(true);
    setActiveSignIn(false);
  }

  if (!activeSignIn) {
    return null;
  }

  return (
    <Modal activeObj={{ active: activeSignIn, setActive: setActiveSignIn }} title={"Ввійти"}>
      <form onSubmit={handleSubmit}>
        <div className="md-form mb-5">
          <i className="fa-solid fa-user"></i>
          <input
            type="login"
            id="login"
            className="validate"
            name="login"
            value={login}
            onChange={handleInputChange}
            placeholder="Username or email"
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
            Login
          </button>
        </div>
      </form>
      <div className="under-text">
        <a href='#' onClick={handleShowSignUpModal}><p>Don't have an account? Sign Up!</p></a>
        <a><p>I forgot password</p></a>
      </div>
    </Modal>
  );
};

export default ModalLoginForm;
