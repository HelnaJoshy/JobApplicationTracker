import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AddApplication.css";

const AddApplication = () => {
    const navigate = useNavigate();

    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("Applied");
    const [dateApplied, setDateApplied] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await api.post("applications/", {
                company: company,
                role: role,
                status: status,
                date_applied: dateApplied,
            });

            navigate("/dashboard");

        } catch (err) {
            console.error(err);

            if (err.response) {
                console.log("Backend response:", err.response.data);
            }

            setError("Unable to add application. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-page">

            <div className="add-card">

                <div className="add-header">
                    <button
                        className="back-button"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Back
                    </button>

                    <div className="add-title">
                        <div className="add-icon">💼</div>

                        <div>
                            <h1>Add New Application</h1>
                            <p>
                                Keep track of your next career opportunity.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Company Name</label>

                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g. Google"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Job Role</label>

                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. Software Developer"
                            required
                        />
                    </div>

                    <div className="form-row">

                        <div className="form-group">
                            <label>Status</label>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="Applied">
                                    Applied
                                </option>

                                <option value="Interviewing">
                                    Interviewing
                                </option>

                                <option value="Rejected">
                                    Rejected
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Date Applied</label>

                            <input
                                type="date"
                                value={dateApplied}
                                onChange={(e) =>
                                    setDateApplied(e.target.value)
                                }
                                required
                            />
                        </div>

                    </div>

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Add Application →"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddApplication;