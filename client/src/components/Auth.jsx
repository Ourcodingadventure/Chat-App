import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import signinImage from "../assets/signup.jpg";
const Auth = () => {
  const cookies = new Cookies();
  const [isSignUp, setIsSignUp] = useState(true);
  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    phoneNumber: "",
    avatarURL: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, phoneNumber, avatarURL, password } = form;
    const URL = `http://localhost:5000/auth`;
    const {
      data: { token, userId, hashedPassword, fullName },
    } = await axios.post(`${URL}/${isSignUp ? "signup" : "login"}`, {
      fullName: form.fullName,
      userName,
      phoneNumber,
      avatarURL,
      password,
    });
    cookies.set(`token`, token);
    cookies.set(`userName`, userName);
    cookies.set(`fullName`, fullName);
    cookies.set(`userId`, userId);
    if (isSignUp) {
      cookies.set(`phoneNumber`, phoneNumber);
      cookies.set(`avatarURL`, avatarURL);
      cookies.set(`hashedPassword`, hashedPassword);
    }
    window.location.reload();
  };
  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">fullName</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="userName">userName</label>
              <input
                type="text"
                name="userName"
                placeholder="userName"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">phoneNumber</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  type="text"
                  name="avatarURL"
                  placeholder="avatarURL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">confirm password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignUp ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp
                ? "Already Have An Account With Us"
                : "Dont have an account "}
              <span onClick={switchMode}>
                {isSignUp ? " Sign In" : " Sign Up"}
              </span>
            </p>
          </div>
        </div>
        <div className="auth__form-container_image">
          <img src={signinImage} alt="Sign In"></img>
        </div>
      </div>
    </div>
  );
};

export default Auth;
