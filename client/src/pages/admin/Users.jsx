import AdminDashboardMenu from "../../components/Layout/AdminDashboardMenu";
import Layout from "../../components/Layout/Layout";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";


function Users() {
    const [users, setUsers] = useState(["test"]);

    useEffect(() => {
        const getUsers = async () => {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/get-all-users`)
            
        }
        try {
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <AdminDashboardMenu />
                <div className="user-dashboard-content">
                    <h2
                        className="dashboard-title"
                        style={{ marginBottom: "27px" }}>
                        Users
                    </h2>
                    <hr />
                    <InputGroup style={{ marginBottom: '1rem'}}>
                        <Form.Control
                            className="footer-input input-focus"
                            placeholder="Type user name or email"
                            aria-label="Type user name or email"
                            aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            Search Users
                        </Button>
                    </InputGroup>
                    <div className="category-cards">
                        <a>
                            <Card>
                                <Card.Body>
                                    <h2 className="category-title">
                                        Name
                                    </h2>
                                    <span>Email</span>
                                </Card.Body>
                            </Card>
                        </a>
                        
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Users;
