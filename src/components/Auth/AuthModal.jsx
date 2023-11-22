import { useState } from "react";
import ModalTransition from "../ui/modal/Modal";
import { Alert, Box, Button} from "@mui/material";
import * as auth from "../../functions/AuthRequests";
import { useSnackbar } from "../../context/SnackbarContext";
import './AuthModal.css';
import { Lock, Mail, Person } from "@mui/icons-material";
import { useTheme } from "../../utils/themeProvider";

const AuthModal = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegistryOpen, setRegistryOpen] = useState(false);
    const { theme } = useTheme();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const { handleClick } = useSnackbar();


    const handleLoginOpen = () => { setLoginOpen(true); setRegistryOpen(false); }
    const handleLoginClose = () => setLoginOpen(false);

    const handleRegistryOpen = () => { setRegistryOpen(true); setLoginOpen(false); }
    const handleRegistryClose = () => setRegistryOpen(false);

    const handleSubmit = () => {
        setErrorMsg('');
        if (!login || !password) {
            setErrorMsg('Відсутний логін чи пароль!');
            return;
        }

        if (isRegistryOpen && !email) {
            setErrorMsg('Відсутня пошта!');
            return;
        }

        if (isLoginOpen) {
            auth.login({ login, password }, 'uk')
                .then(() => {
                    handleClick('success', 'Успішний вхід');
                    handleLoginClose();
                    setErrorMsg('');
                    window.location.reload();
                    setLogin('');
                    setPassword('');
                })
                .catch((error) => setErrorMsg(error.response.data));
        }
        if (isRegistryOpen) {
            auth.register({ login, email, password }, 'uk')
                .then(() => {
                    handleClick('success', 'Успішна реєстрація');
                    handleRegistryClose();
                    setErrorMsg('');
                    window.location.reload();
                    setLogin('');
                    setPassword('');
                    setEmail('');
                })
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'login') {
            setLogin(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };

    const authModalFieldStyles = {
        width: '100%',
        display: 'flex',
        borderRadius: '10px',
        boxShadow: `0px 0px 8px ${theme.palette.mode === 'light' ? '#ccc' : '111'}`,
        paddingRight: '10px',
        paddingLeft: '15px',
        paddingTop: '10px',
        marginTop: '10px',
        marginBottom: '10px',
        paddingBottom: '10px',
        backgroundColor: theme.palette.mode === 'light' ? 'white' : 'black',
    };

    const inputStyles = {
        backgroundColor: "inherit",
        color: theme.palette.text.primary,
        marginLeft: '15px',
        fontSize: '1.0rem',
        width: '100%',
        border: 'none',
        outline: 'none',
    };

    return (
        <>
            <Button variant="contained" color="secondary" onClick={() => handleLoginOpen(true)}>
                Увійти
            </Button>
            <ModalTransition open={isLoginOpen} handleOpen={handleLoginOpen} handleClose={handleLoginClose} title={'Увійти'}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <form className="authmodal">
                        <div style={authModalFieldStyles}>
                            <Person />
                            <input
                                style={inputStyles}
                                type="login"
                                name="login"
                                id="login"
                                value={login}
                                onChange={handleInputChange}
                                placeholder="Ім'я користувача чи пошта"

                            ></input>
                        </div>
                        <div style={authModalFieldStyles}>
                            <Lock />
                            <input
                                style={inputStyles}
                                type="password"
                                id="password"
                                className="validate"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                placeholder="Пароль"
                            >

                            </input>
                        </div>
                        {errorMsg && (
                            <Alert severity="error" sx={{ width: "100%" }}>{errorMsg}</Alert>
                        )}
                        <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ marginTop: "10px" }} fullWidth>Підтвердити</Button>
                    </form>
                    <hr style={{ width: "100%" }} />
                    <small style={{ margin: 5 }}>Не створений акаунт?? <button onClick={handleRegistryOpen}>Зареєструватись</button></small>
                </Box>
            </ModalTransition>
            <ModalTransition open={isRegistryOpen} handleOpen={handleRegistryOpen} handleClose={handleRegistryClose} title={'Реєстрація'}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <form className="authmodal">
                        <div style={authModalFieldStyles}>
                            <Person />
                            <input
                                style={inputStyles}
                                type="login"
                                name="login"
                                id="login"
                                value={login}
                                onChange={handleInputChange}
                                placeholder="Ім'я користувача"
                            ></input>
                        </div>
                        <div style={authModalFieldStyles}>
                            <Mail />
                            <input
                                style={inputStyles}
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={handleInputChange}
                                placeholder="Пошта"
                            ></input>
                        </div>
                        <div style={authModalFieldStyles}>
                            <Lock />
                            <input
                                style={inputStyles}
                                type="password"
                                id="password"
                                className="validate"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                                placeholder="Пароль"
                            >

                            </input>
                        </div>
                        {errorMsg && (
                            <Alert severity="error" sx={{ width: "100%" }}>{errorMsg}</Alert>
                        )}
                        <Button variant="contained" color="secondary" onClick={handleSubmit} sx={{ marginTop: "10px" }} fullWidth>Зареєструватись</Button>
                    </form>
                    <hr style={{ width: "100%" }} />
                    <small style={{ margin: 5 }}><button onClick={handleLoginOpen}>Повернутись</button></small>
                </Box>
            </ModalTransition>
        </>
    );
}

export default AuthModal;