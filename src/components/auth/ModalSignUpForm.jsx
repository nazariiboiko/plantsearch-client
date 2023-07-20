import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { doSignup } from "../../functions/authRequest";
import Modal from '../ui/Modal/Modal';
import './ModalForm.css';

const ModalSignUpForm = ({ activeObj, showSignInModal }) => {
  const { activeSignUp, setActiveSignUp } = activeObj;
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const onClose = () => {
    setActiveSignUp(false);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'login') {
      setLogin(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !login || !password) {
      setErrorMsg('Please fill in all fields.');
      return;
    }

    doSignup({ email, login, password })
      .then(() => {
        navigate('/');
        onClose();
      })
      .catch((error) => setErrorMsg(error.response.data.message))
      .finally(() => {
        setLogin('');
        setPassword('');
        setEmail('');
      });
  };

  if (!activeSignUp) {
    return null;
  }

  return (
    <Modal activeObj={{ active: activeSignUp, setActive: setActiveSignUp }} title={"Реєстрація"}>
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
            type="text"
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

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <div className="modal-footer d-flex justify-content-center">
          <button className="btn btn-default" type="submit">
            Sign up
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalSignUpForm;
