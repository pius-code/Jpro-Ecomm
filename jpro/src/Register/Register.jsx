import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const Navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [Number, setNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfPassword, setConfPassword] = useState("");
  const [Location, setLocation] = useState("");
  const [fillSpaces, setFillSpaces] = useState("");
  const [confP, setConfP] = useState("");
  const [colour, setColor] = useState("Red");

  function handleName(event) {
    setFullName(event.target.value);
  }
  function handleNumber(event) {
    setNumber(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  function confhandlePassword(event) {
    setConfPassword(event.target.value);
  }
  function handleLocation(event) {
    setLocation(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous error messages before new validation
    setFillSpaces(""); // Reset the "Please Fill all available spaces!" message
    setConfP(""); // Reset the password mismatch message

    // Check if any fields are empty
    if (
      !fullName ||
      !Number ||
      !Email ||
      !Password ||
      !ConfPassword ||
      !Location
    ) {
      setFillSpaces("Please fill all available spaces!");
      return; // Prevent API call
    }

    // Check if passwords match
    if (Password !== ConfPassword) {
      setConfP("Your passxwords do not match");
      return;
    }

    // If validation passes, make the API call
    try {
      const response = await axios.post(
        "https://jback-imkatkqy.b4a.run/register",
        {
          fullName,
          Number,
          Email,
          Password,
          Location,
        }
      );
      setColor("Green");
      setFillSpaces(`${response.data}, Redirecting to login page...`);
      setTimeout(() => {
        Navigate("/"); // Redirect after showing the success message
      }, 2000);

      console.log(response.data);
    } catch (error) {
      setColor("Red");
      setFillSpaces("A Piuxcv occured, Please Try again.");
      console.log(error);
    }
  };

  return (
    <div className="screen">
      <h2>JuasoPro</h2>
      <h4>Create an account</h4>
      <h3 style={{ color: colour, fontSize: "35px" }}>{fillSpaces}</h3>
      <h3 style={{ color: "red", fontSize: "35px" }}>{confP}</h3>
      <form className="screenx" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          onChange={handleName}
          value={fullName}
        />
        <input
          type="text"
          placeholder="phoneNumber"
          onChange={handleNumber}
          value={Number}
        />
        <input
          type="Email"
          placeholder="Email"
          onChange={handleEmail}
          value={Email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
          value={Password}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={confhandlePassword}
          value={ConfPassword}
        />
        <input
          type="text"
          placeholder="Home location"
          onChange={handleLocation}
          value={Location}
        />
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
