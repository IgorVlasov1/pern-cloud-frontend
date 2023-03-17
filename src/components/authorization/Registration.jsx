import React, { useState } from "react";
import { registration } from "../../actions/user";
import Input from "../../utils/input/Input";
import "./authorization.css";
const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="authForm">
      <div className="authForm__header">Регистрация</div>
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

      <button onClick={() => registration(email, password)}>Регистрация</button>
    </div>
  );
};

export default Registration;
