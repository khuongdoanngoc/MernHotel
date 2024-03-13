import "./App.css";
import Home from "./pages/Home/index";
import PageNotFound from "./pages/NoPage/NoPage";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import AdminRoute from "./components/Routes/AdminRoute";
import LoginSuccess from "./utils/LoginSuccess";

import * as AdminItems from "./pages/admin/Exporter";
import * as UserItems from "./pages/user/Exporter";

import CategoryUpdation from "./components/Forms/Categories/CategoryUpdation";
import ProductUpdation from "./components/Forms/Products/ProductUpdation";
import Rooms from "./pages/rooms/Rooms";
import RoomBooking from "./pages/rooms/RoomBooking";
import OrderSuccess from "./pages/rooms/OrderSuccess";

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
                <Route
                    path="dashboard/security"
                    element={<UserItems.AccountSecurity />}
                />
                <Route
                    path="dashboard/order"
                    element={<UserItems.UserOrders />}
                />
                <Route
                    path="dashboard/order/:id"
                    element={<UserItems.OrderDetails />}
                />
                <Route
                    path="dashboard/wishlist"
                    element={<UserItems.WishList />}
                />
                <Route
                    path="dashboard/support"
                    element={<UserItems.Supports />}
                />
            </Route>
            <Route path="order/success/:id" element={<OrderSuccess />} />
            <Route path="/admin" element={<AdminRoute />}>
                <Route
                    path="dashboard"
                    element={<AdminItems.AdminDashboard />}
                />
                <Route
                    path="dashboard/security"
                    element={<AdminItems.AccountSecurity />}
                />
                <Route
                    path="dashboard/category"
                    element={<AdminItems.Categories />}
                />
                <Route
                    path="dashboard/category/:slug"
                    element={<CategoryUpdation />}
                />
                <Route path="dashboard/order" element={<AdminItems.Orders />} />
                <Route
                    path="dashboard/order/:id"
                    element={<AdminItems.OrderDetails />}
                />
                <Route
                    path="dashboard/product"
                    element={<AdminItems.Products />}
                />
                <Route
                    path="dashboard/product/:slug"
                    element={<ProductUpdation />}
                />
                <Route
                    path="dashboard/review"
                    element={<AdminItems.Reviews />}
                />
                <Route
                    path="dashboard/wishlist"
                    element={<AdminItems.WishList />}
                />
                <Route
                    path="dashboard/support"
                    element={<AdminItems.Supports />}
                />
                <Route path="dashboard/user" element={<AdminItems.Users />} />
            </Route>
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomBooking />} />
            <Route path="order/success/:id" element={<OrderSuccess />} />
        </Routes>
    );
}

export default App;
