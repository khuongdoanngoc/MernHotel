import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function Footer() {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-content-container footer-border-right">
                    <h3 style={{ fontSize: "1.12rem", fontWeight: 500 }}>
                        CUSTOMER SERVICES
                    </h3>
                    <div className="d-flex flex-direction-column">
                        <span>Contact Us</span>
                        <span>Sell With Us</span>
                        <span>Shipping</span>
                    </div>
                </div>
                <div className="footer-content-container footer-border-right">
                    <h3 style={{ fontSize: "1.12rem", fontWeight: 500 }}>
                        LINKS
                    </h3>
                    <div className="d-flex flex-direction-collumn">
                        <span>Contact Us</span>
                        <span>Sell With Us</span>
                        <span>Shipping</span>
                    </div>
                </div>
                <div className="footer-content-container">
                    <h3 style={{ fontSize: "1.12rem", fontWeight: 500 }}>
                        NEWSLETTER
                    </h3>

                    <div className="footer-newsletter-form">
                        <span>Sign Up for Our Newsletter</span>
                        <form>
                            <InputGroup>
                                <Form.Control
                                    className="footer-input input-focus"
                                    placeholder="Please Enter Your Email"
                                    aria-label="Please Enter Your Email"
                                    aria-describedby="basic-addon2"
                                />
                                <Button
                                    variant="outline-secondary"
                                    id="button-addon2">
                                    Subscribe
                                </Button>
                            </InputGroup>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <span>© {new Date().getFullYear()} MERN Store</span>
            </div>
            <div className="footer-social-items">
                <div className="footer-social-item">
                    <i className="bi bi-facebook"></i>
                </div>
                <div className="footer-social-item">
                    <i className="bi bi-instagram"></i>
                </div>
                <div className="footer-social-item">
                    <i className="bi bi-pinterest"></i>
                </div>
                <div className="footer-social-item">
                    <i className="bi bi-twitter"></i>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
