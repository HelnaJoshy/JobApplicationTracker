import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login Page */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Dashboard - Protected */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Add Application - Protected */}
                <Route
                    path="/add-application"
                    element={
                        <ProtectedRoute>
                            <AddApplication />
                        </ProtectedRoute>
                    }
                />

                {/* Redirect unknown/root pages to Login */}
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;