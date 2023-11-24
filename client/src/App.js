import "./App.css";
import Home from "./pages/Home";
import PageNotFound from "./pages/NoPage";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="" element={<Dashboard />} />
            </Route>
        </Routes>
    );
}

export default App;
