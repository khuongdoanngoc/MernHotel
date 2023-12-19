import "./App.css";
import Home from "./pages/Home/index";
import PageNotFound from "./pages/NoPage";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import LoginSuccess from "./utils/LoginSuccess";
import Support from "./pages/user/Support";

// dashboard items import
import {} from "./";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/success" element={<LoginSuccess />} />
            <Route path="/user" element={<PrivateRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboard/support" element={<Support />} />
            </Route>
            <Route path="/admin" element={<AdminRoute />}>
                <Route path="dashboard" element={<AdminDashboard />} />
            </Route>
        </Routes>
    );
}

export default App;
