/*import { useState } from 'react';
import './loginForm.css';
import LogoEBS from '../logo/logoEbs';
import TextField from '../text-field/textField';
import MyButton from '../button/button';
import { useNavigate } from 'react-router';

const LoginForm = function () {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event, field) => {
    if (field === 'login') {
      setLogin(event.target.value);
    } else if (field === 'password') {
      setPassword(event.target.value);
    }
  };

  const handleLoginClick = () => {
    console.log('Авторизация');
    // Здесь можно добавить логику авторизации
  };

  const actionIDontHaveAccountClick = () => {
    navigate('/register');
    console.log('Кнопка была нажата');
  };

  return (
    <div className="login-form-rectangle">
      <LogoEBS className="login-logo" /> {/* Добавляем класс для логотипа }
      <div className="login-title">Авторизация</div>
      <div className="grid-container">
        <TextField
          value={login}
          onChange={(event) => handleInputChange(event, 'login')}
          labelText="Email"
          placeholder="Email"
        />
        <TextField
          value={password}
          onChange={(event) => handleInputChange(event, 'password')}
          labelText="Пароль"
          placeholder="Пароль"
        />
      </div>
      <MyButton className="authorization-button" onClick={handleLoginClick} label="Войти" />
      <MyButton className="registration-button" onClick={actionIDontHaveAccountClick} label="Создать аккаунт" />
    </div>
  );
};

//export default LoginForm;*/