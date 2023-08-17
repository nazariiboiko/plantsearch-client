import React, { useState } from 'react';
import { activateAccount, doSignup } from "../../functions/authRequest";
import Modal from '../ui/Modal/Modal';
import './ModalForm.css';
import { Alert } from '@mui/material';
import { useSnackbar } from '../../context/SnackbarContext';

const ModalSignUpForm = ({ activeObj, showSignInModal }) => {
  const { activeSignUp, setActiveSignUp } = activeObj;
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [showConfirmCode, setShowConfirmCode] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState(Array(6).fill(''));
  const { handleClick } = useSnackbar();


  const handleChange = (index, value) => {
    const regex = /^\d*$/;
    if (regex.test(value)) {
      const newCode = [...confirmationCode];
      newCode[index] = value;
      setConfirmationCode(newCode);

      if (value === '' && index > 0) {
        const prevInput = document.getElementById(`digit-${index - 1}`);
        if (prevInput) {
          prevInput.focus();
        }
      } else if (value.length === 1 && index < 5) {
        const nextInput = document.getElementById(`digit-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleFirstInputBackspace = (index, event) => {
    const firstInput = confirmationCode[0];
    console.info(event);
    if (event.code === 'Backspace' && firstInput === '') {
      event.preventDefault();

      console.info(index, event);

      const lastInput = document.getElementById(`digit-${index-1}`);
      if (lastInput) {
        lastInput.focus();
      }
    }
  };

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
      setErrorMsg('Необхідно заповнити всі поля!');
      return;
    }

    doSignup({ email, login, password }, 'uk')
      .then((message) => {
        setShowConfirmCode(true);
        console.info(message);
        setInfoMsg(message);
        setErrorMsg('');
      })
      .catch((error) => setErrorMsg(error.response.data))
  };

  const handleSumbitCode = (event) => {
    event.preventDefault();
    console.info({email, login, password}, confirmationCode.join(''));

    activateAccount({email, login, password}, confirmationCode.join(''), 'uk')
    .then(() => {
      setActiveSignUp(false);
      handleClick('success', 'Успішний вхід');
      setLogin('');
      setPassword('');
      setEmail('');
    })
    .catch((error) => setErrorMsg(error.response.data))

  }

  if (!activeSignUp) {
    return null;
  }

  return (
    <Modal activeObj={{ active: activeSignUp, setActive: setActiveSignUp }} title={"Реєстрація"}>
      {!showConfirmCode && <form onSubmit={handleSubmit}>
        <div className="md-form mb-5">
          <i className="fa-solid fa-envelope"></i>
          <input
            type="email"
            id="email"
            className="validate"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Пошта..."
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
            placeholder="Логін..."
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
            placeholder="Пароль..."
          />
        </div>

        <div className="modal-footer d-flex justify-content-center">
          <button className="btn btn-default" type="submit">
            Зареєструватись
          </button>
        </div>
      </form>}

      {showConfirmCode && <form onSubmit={handleSumbitCode}>
        <div class="confirmation-code-input">
          {confirmationCode.map((value, index) => (
            <input
              key={index}
              id={`digit-${index}`}
              type="text"
              maxLength="1"
              className="digit-box"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleFirstInputBackspace(index, e) }
            />
          ))}
        </div>
        <button className="btn btn-default" type="submit">
          Відправити
        </button>
      </form>}
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {infoMsg && <Alert severity="info">{infoMsg}</Alert>}
    </Modal>
  );
};

export default ModalSignUpForm;
