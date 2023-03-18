import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";

import Input from "../../utils/input/Input";
import "./authorization.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="authForm">
      <div className="authForm__header">Вход в аккаунт</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Введите email"
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Введите пароль"
      />

      <button onClick={() => dispatch(login(email, password))}>Войти</button>
    </div>
  );
};

export default Login;
