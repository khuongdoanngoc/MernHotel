import { useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";

function UserDashboardMenu() {
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
                    <tr>
                        <td
                            style={{ display: "block" }}
                            onClick={() => navigate("/user/dashboard")}>
                            Account Details
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{ display: "block" }}
                            onClick={() =>
                                navigate("/user/dashboard/security")
                            }>
                            Account Security
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{ display: "block" }}
                            onClick={() => navigate("/user/dashboard/order")}>
                            Orders
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{ display: "block" }}
                            onClick={() =>
                                navigate("/user/dashboard/wishlist")
                            }>
                            WishList
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{ display: "block" }}
                            onClick={() => navigate("/user/dashboard/support")}>
                            Supports
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default UserDashboardMenu;
