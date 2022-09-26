import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="outer-signup-form">
      <form className="modal signup-form signup-modal" onSubmit={handleSubmit}>
        <ul className='error-ul'>
          {errors.map((error, idx) => <li className="login-errors" key={idx}>{error}</li>)}
        </ul>
        <label className="input-label">
          {/* Email: */}
          <input
            className='input signup-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
          />
        </label>
        <label className="input-label">
          {/* Username: */}
          <input
            className='input signup-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            required
          />
        </label>
        <label className="input-label">
          {/* Password: */}
          <input
            className='input signup-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
          />
        </label>
        <label className="input-label">
          {/* Confirm Password: */}
          <input
            className='input signup-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </label>
        <button className="button submit-button" type="submit">Create account</button>
      </form>
    </div>
  );
}

export default SignupForm;
