import Layout from "../../components/Layout/Layout";
import { Table } from "react-bootstrap";
import "../user/styles.css";
import { Routes, Route, NavLink } from "react-router-dom";

// content menus import
import AccountDetails from "../user/AccountDetails";
import AccountSecurity from "./AccountSecurity";
import Brands from "./Brands";
import Categories from "./Categories";
import Orders from "./Orders";
import Products from "./Products";
import Reviews from "./Reviews";
import Users from "./Users";
import Address from "../user/Address";
import Support from "../user/Support";
import WishList from "../user/WishList";

function AdminDashboard() {
    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <div className="user-dashboard-menu">
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>ACCOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <NavLink
                                    to={""}
                                    className={"dashboard-custom-link"}>
                                    <td>Account Details</td>
                                </NavLink>
                            </tr>

                            <tr>
                                <NavLink
                                    to={"security"}
                                    className={"dashboard-custom-link"}>
                                    <td>Account Security</td>
                                </NavLink>
                            </tr>
                            <tr>
                                <NavLink
                                    to={"product"}
                                    className={"dashboard-custom-link"}>
                                    <td>Products</td>
                                </NavLink>
                            </tr>
                            <tr>
                                <NavLink
                                    to={"category"}
                                    className={"dashboard-custom-link"}>
                                    <td>Categories</td>
                                </NavLink>
                            </tr>
                            <tr>
                                <NavLink
                                    to={"brand"}
                                    className={"dashboard-custom-link"}>
                                    <td>Brands</td>
                                </NavLink>
                            </tr>
                            <tr>
                                <NavLink
                                    to={"user"}
                                    className={"dashboard-custom-link"}>
                                    <td>User</td>
                                </NavLink>
                            </tr>
                            <tr>
                                <NavLink
                                    to={"order"}
                                    className={"dashboard-custom-link"}>
                                    <td>Orders</td>
                                </NavLink>
                            </tr>
                            <tr>
                                <NavLink
                                    to={"address"}
                                    className={"dashboard-custom-link"}>
                                    <td>Address</td>
                                </NavLink>
                            </tr>
                            <tr>
                                <NavLink
                                    to={"review"}
                                    className={"dashboard-custom-link"}>
                                    <td>Reviews</td>
                                </NavLink>
                            </tr>
                            <tr>
                                <NavLink
                                    to={"wishlist"}
                                    className={"dashboard-custom-link"}>
                                    <td>WishList</td>
                                </NavLink>
                            </tr>
                            <tr>
                                <NavLink
                                    to={"support"}
                                    className={"dashboard-custom-link"}>
                                    <td>Supports</td>
                                </NavLink>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="user-dashboard-content">
                    <Routes>
                        <Route path="" Component={AccountDetails} />
                        <Route path="security" Component={AccountSecurity} />
                        <Route path="/brand" element={<Brands />} />
                        <Route path="/category" element={<Categories />} />
                        <Route path="/order" element={<Orders />} />
                        <Route path="/product" element={<Products />} />
                        <Route path="/review" element={<Reviews />} />
                        <Route path="/user" element={<Users />} />
                        <Route path="/address" element={<Address />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/wishlist" element={<WishList />} />
                    </Routes>
                </div>
            </div>
        </Layout>
    );
}

export default AdminDashboard;
