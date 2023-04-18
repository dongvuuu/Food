import React from "react";
import "./footer.css";
import logo from "../../assets/images/eco-logo.png";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
const Footer = () => {

    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col lg="4" className="mb-4" md="6">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                            <div>
                                <h1 className="text-white">f 0_0 d</h1>
                            </div>

                        </div>
                        <p className="footer__text mt-4">
                            Just a click <br />
                            We deliver what you want <br />
                            Fast - Convenient - Safe
                        </p>
                    </Col>

                    <Col lg="3" md="3" className="mb-4">
                        <div className="footer__quick-links">
                            <h4 className="quick__link-tittle">Top Categories</h4>
                            <ListGroup>
                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="#">Fast Food</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="#">Ice Cream</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="#">Drink</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="#">Fruits</Link>
                                </ListGroupItem>

                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg="2" md="3" className="mb-4">
                        <div className="footer__quick-links">
                            <h4 className="quick__link-tittle">Useful Links</h4>
                            <ListGroup>
                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="/shop">Shop</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="/cart">Cart</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="/login">Login</Link>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0">
                                    <Link to="#">Privacy Policy</Link>
                                </ListGroupItem>

                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg="3" md="4">
                        <div className="footer__quick-links">
                            <h4 className="quick__link-tittle">Contact</h4>
                            <ListGroup className="footer__contact">
                                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                    <span><i class="ri-map-pin-line"></i></span>
                                    <p>3/2 Hung Loi Ninh Kieu Can Tho</p>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                    <span><i class="ri-phone-line"></i></span>
                                    <p>0367673779</p>
                                </ListGroupItem>

                                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                                    <span><i class="ri-mail-line"></i></span>
                                    <p>fooddeliver@gmail.com</p>
                                </ListGroupItem>

                            </ListGroup>
                        </div>
                    </Col>

                    <Col lg="12">
                        <p className="footer__copyright">Copyright {year} developed by team 08. All rights reserved</p>
                    </Col>
                </Row>
            </Container>
        </footer >
    );
};
export default Footer;