import React from "react";
import "../styles/cart.css"
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";


import { motion } from "framer-motion";
import { cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";


const Cart = () => {

    const cartItems = useSelector(state => state.cart.cartItems);
    console.log(cartItems)
    const totalAmount = useSelector((state) => state.cart.totalAmount);



    return (
        <Helmet title="Cart">
            <CommonSection title="Shopping Cart" />
            <section>
                <Container>
                    <Row>
                        <Col lg="9">

                            {
                                cartItems.length === 0 ? (
                                    <h2 className="fs-4 text-center">No item added to the cart</h2>
                                ) : (
                                    <table className="table bordered">
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                cartItems.map((item, index) => (
                                                    <Tr item={item} key={index} />
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                )
                            }


                        </Col>
                        <Col lg="3">
                            <div>
                                <h6 className="d-flex align-items-center justify-content-between">
                                    Subtotal
                                    <span className="fs-4 fw-bold">${totalAmount}</span>
                                </h6>

                            </div>
                            <p className="fs-6 mt-2">Taxes and shipping will calculate in checkout</p>
                            <div>


                                <button className="buy__btn w-100"><Link to="/checkout">Checkout</Link></button>
                                <button className="buy__btn w-100 mt-3"><Link to="/shop">Continue Shopping</Link></button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};
const Tr = ({ item }) => {

    const dispatch = useDispatch();

    const deleteProduct = () => {
        dispatch(cartActions.deleteItem(item.id))
    };


    const handlePlus = () => {
        dispatch(cartActions.addItem({
            id: item.id,
            productName: item.title,
            price: item.price,
            imgUrl: item.imgUrl,

        }))
    }
    const handleMinus = () => {
        dispatch(cartActions.minusItem({
            id: item.id,
            productName: item.title,
            price: item.price,
            imgUrl: item.imgUrl,
        }))
    }
    return <tr>
        <td><img src={item?.imgUrl} alt="" /></td>
        <td>{item?.productName}</td>
        <td>${item?.price}</td>
        <td>
            <div class="input">
                <button onClick={handleMinus} class="minus" aria-label="Decrease by one" >
                    <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="1" x2="16" y2="1" stroke="#0064FE" stroke-width="2" class="icon" />
                    </svg>
                </button>
                <div class="number dim"> {item?.quantity}</div>
                <button onClick={handlePlus} class="plus" aria-label="Increase by one">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
                        <line x1="8" y1="4.37114e-08" x2="8" y2="16" stroke="#0064FE" stroke-width="2" />
                        <line y1="8" x2="16" y2="8" stroke="#0064FE" stroke-width="2" />
                    </svg>

                </button>
            </div>
            {/* <button onClick={handlePlus}>+</button>
           
            <button onClick={handleMinus}>-</button> */}
        </td>
        <td>
            <motion.i whileTap={{ scale: 1.2 }} onClick={deleteProduct} class="ri-delete-bin-line"></motion.i>
        </td>
    </tr>
}

export default Cart;