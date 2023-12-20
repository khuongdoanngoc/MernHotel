import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

function AdminDashboardMenu() {
    const navigate = useNavigate();

    return (
        <div className="user-dashboard-menu">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ACCOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="menu-detail">
                        <td
                            style={{ display: "block" }}
                            onClick={() => navigate("/admin/dashboard")}>
                            Account Details
                        </td>
                    </tr>
                    <tr className="menu-security">
                        <td
                            style={{ display: "block" }}
                            onClick={() =>
                                navigate("/admin/dashboard/security")
                            }>
                            Account Security
                        </td>
                    </tr>
                    <tr className="menu-category">
                        <td
                            style={{ display: "block" }}
                            onClick={() =>
                                navigate("/admin/dashboard/category")
                            }>
                            Categories
                        </td>
                    </tr>
                    <tr className="menu-product">
                        <td
                            style={{ display: "block" }}
                            onClick={() =>
                                navigate("/admin/dashboard/product")
                            }>
                            Products
                        </td>
                    </tr>
                    <tr className="menu-user">
                        <td
                            style={{ display: "block" }}
                            onClick={() => navigate("/admin/dashboard/user")}>
                            Users
                        </td>
                    </tr>
                    <tr className="menu-order">
                        <td
                            style={{ display: "block" }}
                            onClick={() => navigate("/admin/dashboard/order")}>
                            Orders
                        </td>
                    </tr>
                    <tr className="menu-review">
                        <td
                            style={{ display: "block" }}
                            onClick={() => navigate("/admin/dashboard/review")}>
                            Reviews
                        </td>
                    </tr>
                    <tr className="menu-wishlist">
                        <td
                            style={{ display: "block" }}
                            onClick={() =>
                                navigate("/admin/dashboard/wishlist")
                            }>
                            WishList
                        </td>
                    </tr>
                    <tr className="menu-support">
                        <td
                            style={{ display: "block" }}
                            onClick={() =>
                                navigate("/admin/dashboard/support")
                            }>
                            Supports
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default AdminDashboardMenu;
