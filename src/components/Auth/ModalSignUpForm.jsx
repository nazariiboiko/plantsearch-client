import React, { useState } from 'react';
import { activateAccount, doSignup } from "../../functions/authRequest";
import Modal from '../ui/Modal/Modal';
import './ModalForm.css';
import { Alert } from '@mui/material';
import { useSnackbar } from '../../context/SnackbarContext';
import PasswordStrength from './PasswordStrength';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';
import { site_key } from '../../utils/constants';
import { PinInput } from 'react-input-pin-code'

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
  const [visibility, setVisibility] = useState(false);
  const [visibility2, setVisibility2] = useState(false);
  const [password2, setPassword2] = useState('');
  const captchaRef = useRef(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [strengthValue, setStrengthValue] = useState(0);


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

      const lastInput = document.getElementById(`digit-${index - 1}`);
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
      if (value === '' || (value.length <= 15 && /^[a-zA-Z0-9]+$/.test(value))) {
        setLogin(value);
      }
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'password2') {
      setPassword2(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !login || !password) {
      setErrorMsg('Необхідно заповнити всі поля!');
      return;
    }

    if (login.length < 4) {
      setErrorMsg('Логін користувача має бути довшим ніж 4 символа.');
      return;
    }

    if (password !== password2) {
      setErrorMsg('Паролі не співпадають.');
      return;
    }

    if (!isCaptchaVerified) {
      setErrorMsg('Підтвердіть, що ви не робот.');
      return;
    }

    if (strengthValue <= 2) {
      setErrorMsg('Пароль занадто слабкий.');
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

    activateAccount({ email, login, password }, confirmationCode.join(''), 'uk')
      .then(() => {
        setActiveSignUp(false);
        handleClick('success', 'Успішний вхід');
        setLogin('');
        setPassword('');
        setEmail('');
      })
      .catch((error) => setErrorMsg(error.response.data))

  }

  const handleCaptchaChange = (value) => {
    setIsCaptchaVerified(true);
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  }

  const handleVisibility2 = () => {
    setVisibility2(!visibility2);
  }

  const handleStrengthChange = (newValue) => {
    setStrengthValue(newValue);
  };

  if (!activeSignUp) {
    return null;
  }

  return (
    <Modal activeObj={{ active: activeSignUp, setActive: setActiveSignUp }} title={"Реєстрація"}>
      {!showConfirmCode && <form onSubmit={handleSubmit}>
        <div className="md-form mb-2-auth">
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

        <div className="md-form mb-2-auth">
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

        <div className="md-form mb-2-auth">
          <i className="fas fa-lock prefix grey-text"></i>
          <input
            type={visibility ? '' : 'password'}
            id="password"
            className="validate"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Пароль..."
          />
          {visibility && <button className='empty-button' onClick={handleVisibility}><Visibility /></button>}
          {!visibility && <button className='empty-button' onClick={handleVisibility}><VisibilityOff /></button>}
        </div>
        <div className="md-form mb-2-auth">
          <i className="fas fa-lock prefix grey-text"></i>
          <input
            type={visibility2 ? '' : 'password'}
            id="password2"
            className="validate"
            name="password2"
            value={password2}
            onChange={handleInputChange}
            placeholder="Підтвердіть пароль..."
          />
          {visibility2 && <button className='empty-button' onClick={handleVisibility2}><Visibility /></button>}
          {!visibility2 && <button className='empty-button' onClick={handleVisibility2}><VisibilityOff /></button>}
        </div>
        <PasswordStrength password={password} strengthValue={handleStrengthChange} />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ReCAPTCHA sitekey={site_key} ref={captchaRef} onChange={handleCaptchaChange} />
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button className="btn btn-default" type="submit">
            Зареєструватись
          </button>
        </div>
      </form>}

      {showConfirmCode && <form onSubmit={handleSumbitCode}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
          <div class="confirmation-code-input">
            <PinInput
              values={confirmationCode}
              onChange={(value, index, confirmationCode) => setConfirmationCode(confirmationCode)}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
          <button className="btn btn-primary" type="submit">
            Відправити
          </button>
        </div>
      </form>}
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {infoMsg && <Alert severity="info">{infoMsg}</Alert>}
    </Modal>
  );
};

export default ModalSignUpForm;
