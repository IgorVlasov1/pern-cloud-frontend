import React, { useState, useEffect } from "react";
import { registration } from "../../actions/user";
import { BsFillEyeSlashFill } from "react-icons/bs";
import styles from "./Register.module.css";
import "./authorization.css";
import { useDispatch } from "react-redux";
import FileActionsInfo from "../disk/FileActionsInfo";
const Registration = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [visiblePassword, setVisiblePassword] = useState("password");
  const [password, setPassword] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Емейл не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Пароль не может быть пустым"
  );
  const [passwordCopy, setPasswordCopy] = useState("");
  const [passwordCopyDirty, setPasswordCopyDirty] = useState(false);
  const [passwordCopyError, setPasswordCopyError] = useState("");
  const [visibleCopyPassword, setVisibleCopyPassword] = useState("password");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError || passwordCopyError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, passwordCopyError]);

  useEffect(() => {
    if (passwordCopy !== password) {
      setPasswordCopyError("Пароли не совпадают");
    } else {
      setPasswordCopyError("");
    }
  }, [passwordCopy, password]);

  const handlePassChange = () => {
    setVisiblePassword("text");
  };
  const hiddenPassword = () => {
    setVisiblePassword("password");
  };
  const handlePassCopyChange = () => {
    setVisibleCopyPassword("text");
  };
  const hiddenPasswordCopy = () => {
    setVisibleCopyPassword("password");
  };
  const blurHandler = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "passwordCopy":
        setPasswordCopyDirty(true);
        break;
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный емейл");
    } else {
      setEmailError("");
    }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 12) {
      setPasswordError("Пароль должен содержать более 3 и менее 12 символов");
    } else {
      setPasswordError("");
    }
  };
  const handleCopyPassword = (e) => {
    setPasswordCopy(e.target.value);
  };
  return (
    <>
      <div className={styles.formRegTitle}>Создайте аккаунт</div>
      <form className={styles.formReg}>
        <input
          className={styles.emailInput}
          onBlur={(e) => blurHandler(e)}
          name="email"
          value={email}
          type="text"
          onChange={handleEmail}
          placeholder="Введите почту..."
        />
        {emailDirty && emailError && (
          <p className={styles.emailCheck}>{emailError}</p>
        )}

        <input
          className={styles.passwordInput}
          onBlur={(e) => blurHandler(e)}
          name="password"
          value={password}
          type={visiblePassword}
          onChange={handlePassword}
          placeholder="Введите пароль..."
        />
        {passwordDirty && passwordError && (
          <p className={styles.passCheck}>{passwordError}</p>
        )}
        <BsFillEyeSlashFill
          className={styles.hiddenPassword}
          onPointerDown={handlePassChange}
          onPointerUp={hiddenPassword}
        />
        <input
          className={styles.inputCopyPassword}
          onBlur={(e) => blurHandler(e)}
          name="passwordCopy"
          value={passwordCopy}
          type={visibleCopyPassword}
          onChange={handleCopyPassword}
          placeholder="Повторите пароль..."
        />
        {passwordCopyDirty && passwordCopyError && (
          <p className={styles.copyPassCheck}>{passwordCopyError}</p>
        )}

        <BsFillEyeSlashFill
          className={styles.checkCopyPassword}
          onPointerDown={handlePassCopyChange}
          onPointerUp={hiddenPasswordCopy}
        />

        <button
          disabled={!formValid}
          onClick={(e) => {
            console.log(123);
            e.preventDefault();
            dispatch(registration(email, password));
          }}
        >
          Регистрация
        </button>
      </form>
      <FileActionsInfo />
    </>
  );
};
export default Registration;
