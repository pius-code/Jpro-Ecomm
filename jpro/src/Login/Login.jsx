import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function handleUsername(event) {
    setUsername(event.target.value);
  }
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      console.log("Response from server:", response);

      if (response.data && response.data.message) {
        if (response.data.message === "Login successful") {
          console.log("Login successful!");
          navigate("/Home");
        } else {
          console.log("Login failed:", response.data.message);
          setErrorMessage(response.data.message);
        }
      } else {
        console.log("Unexpected response format:", response.data);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.log("Error during login:", error);
      setErrorMessage("Invalid Username Or Password");
    }
  };

  localStorage.setItem("username", username);
  return (
    <div className={styles.screen}>
      <h2 className={styles.Juaso}>JuasoPro</h2>
      <p className={styles.para}>Shop at Market from Home</p>
      <div className={styles.screenx}>
        <h3 className={styles.textx}>Login</h3>
        <form className={styles.formx}>
          <input
            type="email"
            value={username}
            onChange={handleUsername}
            placeholder="Enter your Email or Username"
            className={styles.inp}
          />
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="Enter your Password"
            className={styles.inp}
          />
          <button className={styles.btn} onClick={handleLogin}>
            Log In
          </button>
        </form>
        {errorMessage && (
          <div style={{ color: "red", fontSize: "35px" }}>{errorMessage}</div>
        )}

        <a onClick={() => navigate("/Register")}>New here? Register</a>
        <a onClick={() => navigate("/Reset")}>Forgot Password</a>
      </div>
    </div>
  );
}

export default Login;
