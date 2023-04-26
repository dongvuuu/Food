
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import "../styles/checkout.css";
import { useSelector } from "react-redux";
import useAuth from "../custom-hooks/useAuth";


import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'

const Checkout = () => {
    const { currentUser } = useAuth();

    const totalQty = useSelector(state => state.cart.totalQuantity);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => state.cart.cartItems);
    console.log(cartItems)
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState()
    const [city, setCity] = useState()
    const [address, setAddress] = useState()
    const [code, setCode] = useState()
    const navigate = useNavigate();

    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            userId: currentUser?.uid,
            displayName: currentUser?.displayName,
            email: currentUser?.email,
            phone: phone,
            city: city,
            address: address,
            code: code,
            cartItems,
            totalAmount: totalAmount,
        };
        // console.table(data?.cartItems)
        try {
            // const docRef = await collection(db, "orders", '8')
            await setDoc(doc(db, "orders", uuidv4()), data)

            setLoading(false);
            toast.success("Dat Hang Thanh Cong");
            navigate("/");
        } catch (error) {
            setLoading(false);
            toast.error("Product not added");
        }


        // console.log(product);
    }

    return (
        <Helmet title="Checkout">
            <CommonSection title="Checkout" />
            <section>
                <Container>
                    <Row>
                        <Col lg="8">
                            <h6 className="mb-4 fw-bold">Billing Information</h6>
                            <Form className="billing__form">
                                <FormGroup className="form__group">
                                    <input type="text" value={currentUser?.displayName} disabled placeholder="Enter your name" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="email" value={currentUser?.email} disabled placeholder="Enter your email" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input onChange={(e) => setPhone(e.target.value)} value={phone} type="number" placeholder="Phone number" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder="Street address" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input onChange={(e) => setCity(e.target.value)} value={city} type="text" placeholder="City" />
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input onChange={(e) => setCode(e.target.value)} value={code} type="text" placeholder="Postal code" />
                                </FormGroup>

                            </Form>
                        </Col>
                        <Col lg="4">
                            <div className="checkout__cart">
                                <h6>Total Qty: <span>{totalQty} items</span></h6>
                                <h6>Subtotal: <span>${totalAmount}</span></h6>
                                <h6><span>Shipping: <br />
                                    free shipping
                                </span>
                                    <span>$0</span>
                                </h6>

                                <h4>Total Cost: <span>${totalAmount}</span></h4>
                                {currentUser?.uid != '' ? (<>
                                    <button onClick={addProduct} className="buy_btn auth__btn w-100">Place an oder</button>
                                </>) : (
                                    <>
                                        <button onClick={navigate("/login")} className="buy_btn auth__btn w-100">Place an oder</button>
                                    </>
                                )}
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Checkout;