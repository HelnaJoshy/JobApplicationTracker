import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const success = await login(username, password);

        setLoading(false);

        if (success) {
            navigate("/dashboard");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-page">

            {/* Left Section */}
            <div className="login-info">

                <div className="brand">
                    <div className="brand-icon">💼</div>
                    <span>JobTrack</span>
                </div>

                <div className="info-content">
                    <p className="small-heading">
                        YOUR CAREER. YOUR JOURNEY.
                    </p>

                    <h1>
                        Keep your
                        <span> career </span>
                        moving forward.
                    </h1>

                    <p className="description">
                        Organize your job applications, track interviews,
                        and stay on top of every opportunity — all in one place.
                    </p>

                    <div className="features">

                        <div className="feature">
                            <span>✓</span>
                            <p>Track every application</p>
                        </div>

                        <div className="feature">
                            <span>✓</span>
                            <p>Monitor interview progress</p>
                        </div>

                        <div className="feature">
                            <span>✓</span>
                            <p>Never lose track of an opportunity</p>
                        </div>

                    </div>
                </div>

                <div className="copyright">
                    © 2026 JobTrack
                </div>

            </div>

            {/* Right Section */}
            <div className="login-section">

                <div className="login-card">

                    <div className="mobile-brand">
                        💼 JobTrack
                    </div>

                    <div className="login-header">
                        <h2>Welcome back 👋</h2>
                        <p>
                            Sign in to continue managing your applications.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">
                            <label>Username</label>

                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In →"}
                        </button>

                    </form>

                    <p className="login-footer">
                        Job Application Tracker
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;
