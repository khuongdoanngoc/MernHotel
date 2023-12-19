import { NavLink } from "react-router-dom";
import { Table } from "react-bootstrap";

function DashboardMenu() {
    return (
        <div className="user-dashboard-menu">
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>ACCOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <NavLink to={""} className={"dashboard-custom-link"}>
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
    );
}

export default DashboardMenu;
