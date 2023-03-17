import Navbar from "./components/navbar/Navbar";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";
import { auth } from "./actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Disk from "./components/disk/Disk";
import Profile from "./components/profile/Profile";
function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(auth());
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {!isAuth ? (
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Disk />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
