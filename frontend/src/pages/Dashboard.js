import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Dashboard.css";

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Search and filter
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const fetchApplications = async () => {
        try {
            setLoading(true);

            const response = await api.get("applications/");

            setApplications(response.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Unable to load your applications.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // Update application status
    const updateStatus = async (id, newStatus) => {
        try {
            await api.patch(`applications/${id}/`, {
                status: newStatus,
            });

            setApplications((previousApplications) =>
                previousApplications.map((application) =>
                    application.id === id
                        ? {
                              ...application,
                              status: newStatus,
                          }
                        : application
                )
            );
        } catch (err) {
            console.error(err);
            alert("Unable to update the application status.");
        }
    };

    // Delete application
    const deleteApplication = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`applications/${id}/`);

            setApplications((previousApplications) =>
                previousApplications.filter(
                    (application) => application.id !== id
                )
            );
        } catch (err) {
            console.error(err);
            alert("Unable to delete the application.");
        }
    };

    // Search + filter
    const filteredApplications = applications.filter((application) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            application.company.toLowerCase().includes(search) ||
            application.role.toLowerCase().includes(search);

        const matchesStatus =
            statusFilter === "All" ||
            application.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const appliedCount = applications.filter(
        (app) => app.status === "Applied"
    ).length;

    const interviewingCount = applications.filter(
        (app) => app.status === "Interviewing"
    ).length;

    const rejectedCount = applications.filter(
        (app) => app.status === "Rejected"
    ).length;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard">

            {/* NAVBAR */}
            <nav className="navbar">

                <div className="navbar-brand">

                    <div className="navbar-icon">
                        💼
                    </div>

                    <div>
                        <h2>JobTrack</h2>
                        <span>Job Application Tracker</span>
                    </div>

                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </nav>


            {/* MAIN CONTENT */}
            <main className="dashboard-content">

                {/* WELCOME */}
                <div className="welcome-section">

                    <div>

                        <p className="dashboard-label">
                            APPLICATION DASHBOARD
                        </p>

                        <h1>
                            Your career journey 🚀
                        </h1>

                        <p>
                            Keep track of every opportunity and stay
                            organized throughout your job search.
                        </p>

                    </div>

                    <button
                        className="add-button"
                        onClick={() =>
                            navigate("/add-application")
                        }
                    >
                        + Add Application
                    </button>

                </div>


                {/* STATISTICS */}
                <div className="stats-grid">

                    <div className="stat-card">
                        <div className="stat-icon blue">
                            📋
                        </div>

                        <div>
                            <p>Total Applications</p>
                            <h2>{applications.length}</h2>
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-icon purple">
                            📨
                        </div>

                        <div>
                            <p>Applied</p>
                            <h2>{appliedCount}</h2>
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-icon orange">
                            💬
                        </div>

                        <div>
                            <p>Interviewing</p>
                            <h2>{interviewingCount}</h2>
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-icon red">
                            ✕
                        </div>

                        <div>
                            <p>Rejected</p>
                            <h2>{rejectedCount}</h2>
                        </div>
                    </div>

                </div>


                {/* APPLICATIONS */}
                <section className="applications-section">

                    <div className="section-header">

                        <div>
                            <h2>Your Applications</h2>

                            <p>
                                Manage and track all your job applications.
                            </p>
                        </div>

                        <button
                            className="refresh-button"
                            onClick={fetchApplications}
                        >
                            ↻ Refresh
                        </button>

                    </div>


                    {/* SEARCH + FILTER */}

                    <div className="search-filter-bar">

                        <div className="search-box">

                            <span>🔎</span>

                            <input
                                type="text"
                                placeholder="Search company or role..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                }
                            />

                        </div>


                        <select
                            className="filter-select"
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >

                            <option value="All">
                                All Status
                            </option>

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


                    {/* LOADING */}

                    {loading && (
                        <div className="message">
                            Loading applications...
                        </div>
                    )}


                    {/* ERROR */}

                    {error && (
                        <div className="error-box">
                            {error}
                        </div>
                    )}


                    {/* NO RESULTS */}

                    {!loading &&
                        !error &&
                        filteredApplications.length === 0 && (

                            <div className="empty-state">

                                <div>🔍</div>

                                <h3>
                                    No applications found
                                </h3>

                                <p>
                                    Try changing your search or
                                    status filter.
                                </p>

                            </div>
                        )}


                    {/* TABLE */}

                    {!loading &&
                        !error &&
                        filteredApplications.length > 0 && (

                            <div className="application-table">

                                <div className="table-header">

                                    <span>Company</span>
                                    <span>Role</span>
                                    <span>Status</span>
                                    <span>Date Applied</span>
                                    <span>Action</span>

                                </div>


                                {filteredApplications.map(
                                    (application) => (

                                        <div
                                            className="application-row"
                                            key={application.id}
                                        >

                                            {/* COMPANY */}

                                            <div className="company-cell">

                                                <div className="company-logo">

                                                    {application.company
                                                        ? application.company
                                                              .charAt(0)
                                                              .toUpperCase()
                                                        : "?"}

                                                </div>

                                                <strong>
                                                    {application.company}
                                                </strong>

                                            </div>


                                            {/* ROLE */}

                                            <span className="role">
                                                {application.role}
                                            </span>


                                            {/* STATUS */}

                                            <select
                                                className={`status-select ${application.status
                                                    .toLowerCase()
                                                    .replace(
                                                        " ",
                                                        "-"
                                                    )}`}
                                                value={
                                                    application.status
                                                }
                                                onChange={(e) =>
                                                    updateStatus(
                                                        application.id,
                                                        e.target.value
                                                    )
                                                }
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


                                            {/* DATE */}

                                            <span className="date">
                                                {application.date_applied}
                                            </span>


                                            {/* DELETE */}

                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    deleteApplication(
                                                        application.id
                                                    )
                                                }
                                            >
                                                🗑️ Delete
                                            </button>

                                        </div>
                                    )
                                )}

                            </div>
                        )}

                </section>

            </main>

        </div>
    );
};

export default Dashboard;