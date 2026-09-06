import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signupUser } from "../services/api";

const Signup = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      setLoading(true);

      await signupUser({
        username,
        email,
        password,
      });

      navigate("/login");

    } catch (error) {

      console.log(error);

      setError(
        error.response?.data?.message ||
        "Signup failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join the Social community
        </p>


        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />


          {error && (
            <p className="error-message">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Creating..." : "Signup"}
          </button>

        </form>


        <p className="auth-link">

          Already have an account?{" "}

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Signup;