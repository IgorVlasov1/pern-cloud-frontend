import React, { useState, useEffect } from "react";
import { registration } from "../../actions/user";
import { BsFillEyeSlashFill } from "react-icons/bs";
import styles from "./Register.module.css";
import Input from "../../utils/input/Input";
import "./authorization.css";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "../../reducers/appReducer";
import { setFileActionsInfo } from "../../reducers/fileReducer";
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
    if (e.target.value.length < 8) {
      setPasswordError("Пароль должен содержать не менее 8 символов");
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
          onClick={() => {
            registration(email, password);
            dispatch(setFileActionsInfo(0, "Аккаунт создан", "flex"));
          }}
        >
          Регистрация
        </button>
      </form>
      <FileActionsInfo />
    </>
  );
};
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   return (
//     <div className="authForm">
//       <div className="authForm__header">Регистрация</div>
//       <Input
//         value={email}
//         setValue={setEmail}
//         type="text"
//         placeholder="Введите email"
//       />
//       <Input
//         value={password}
//         setValue={setPassword}
//         type="password"
//         placeholder="Введите пароль"
//       />

//       <button onClick={() => registration(email, password)}>Регистрация</button>
//     </div>
//   );
// };

export default Registration;
