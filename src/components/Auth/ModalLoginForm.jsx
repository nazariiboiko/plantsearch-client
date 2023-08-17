import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { doLogin } from "../../functions/authRequest";
import Modal from '../ui/Modal/Modal';
import './ModalForm.css';
import { Alert } from '@mui/material';
import { useSnackbar } from "../../context/SnackbarContext";
import { useAuth, getRole, getToken, getName, isToken } from '../../functions/authUtils';


const ModalLoginForm = ({ activeObj, showSignUpModal }) => {
  const { activeSignIn, setActiveSignIn } = activeObj;
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const auth = useAuth();
  const { handleClick } = useSnackbar();

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
    if (!login || !password) {
      setErrorMsg('Відсутний логін чи пароль!');
      return;
    }

    event.preventDefault();
    doLogin({ login, password }, 'uk')
      .then(() => {
        handleClick('success', 'Успішний вхід');
        setActiveSignIn(false);
        setErrorMsg('');
      })
      .catch((error) => setErrorMsg(error.response.data));

    setLogin('');
    setPassword('');
  };

  const handleShowSignUpModal = () => {
    showSignUpModal(true);
    setActiveSignIn(false);
  }

  if (!activeSignIn) {

    return null;
  }

  return (
    <Modal activeObj={{ active: activeSignIn, setActive: setActiveSignIn }} title={"Увійти"}>
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

        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      </form>
      <div className="under-text">
        <a href='#' onClick={handleShowSignUpModal}><p>Відсутній акаунт? Зареєструйтесь!</p></a>
        <a><p>Я забув пароль</p></a>
      </div>
    </Modal>
  );
};

export default ModalLoginForm;