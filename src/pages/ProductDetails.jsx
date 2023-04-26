import React, { useState, useRef, useEffect } from "react";

import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
// import products from "../assets/data/products";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

import { db } from "../firebase.config";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";
import useAuth from "../custom-hooks/useAuth";
import { v4 as uuidv4 } from 'uuid'
const ProductDetails = () => {
    const { currentUser } = useAuth();

    const [products, setProduct] = useState({});
    const [tab, setTab] = useState("desc");
    const reviewUser = useRef("");
    const reviewMsg = useRef("");
    const dispatch = useDispatch();

    const [rating, setRating] = useState(null);
    const { id } = useParams()
    const { data: product } = useGetData("products");
    // const product = products.find(item => item.id === id)
    const docRef = doc(db, "products", id)
    // console.log(docRef)
    // const docRef = doc(db, "cities", "2l3bcSGs2vZBIc3RODwp");
    const getProduct = async () => {
        // const docSnap = await getDoc(docRef)
        // console.log(docSnap)
        // if (docSnap.exists()) {
        //     setProduct(docSnap.data())
        //     console.log(products)
        // } else {
        //     console.log("No product")
        // }
        try {
            const docSnap = await getDoc(docRef);
            // console.log(docSnap.data());
            if (docSnap.exists()) {
                // console.log(docSnap.data());
                setProduct(docSnap.data())
            } else {
                console.log("Document does not exist")
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProduct()
    }, [])

    const {
        imgUrl,
        productName,
        price,
        // avgRating, reviews, 
        description, shortDesc, category } = product;

    // đoạn này làm gì??
    const relatedProducts = product.filter(item => item?.category == category);
    // const relatedProducts = [];

    const submitHandler = (e) => {

        const reviewUserName = reviewUser.current.value;
        const reviewUserMsg = reviewMsg.current.value;

        const reviewObj = {
            userName: reviewUserName,
            text: reviewUserMsg,
            rating,
        };
        console.log(reviewObj);
        toast.success("Review submitted");
    };

    const addToCart = () => {
        dispatch(cartActions.addItem({
            id,
            imgUrl: products?.imgUrl,
            productName: products?.productName,
            price: products?.price,

        })
        );
        toast.success("Product added successfully");
    };
    // console.log(products?.cmt)
    const handleChangeComment = () => {
        try {

            updateDoc(docRef, {
                cmt: arrayUnion(
                    {
                        displayName: currentUser?.displayName,
                        userId: currentUser?.uid,
                        comment: reviewMsg.current.value,
                        photoURL: currentUser?.photoURL,
                        rating: rating,
                        id: uuidv4()
                    }
                )
            })
            toast.success("Review submitted");
            getProduct()

        } catch (error) {

        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [product]);

    return (
        <Helmet title={products?.title}>
            <CommonSection title={products?.title} />
            <section className="pt-0">
                <Container>
                    <Row>
                        <Col lg="6">
                            <img src={products?.imgUrl} alt="" />
                        </Col>

                        <Col lg="6">
                            <div className="product__details">
                                <h2>{products?.title}</h2>
                                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                                    <div>
                                        <span>
                                            <i class="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i class="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i class="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i class="ri-star-s-fill"></i>
                                        </span>
                                        <span>
                                            <i class="ri-star-half-s-line"></i>
                                        </span>
                                    </div>

                                    {/* <p>(<span>{avgRating}</span> ratings)</p> */}
                                </div>

                                <div className="d-flex align-items-center gap-5">
                                    <span className="product__price">${products?.price}</span>
                                    <span>Category: {products?.category?.toUpperCase()}</span>
                                </div>
                                <p className="mt-3">{products?.shortDesc}</p>

                                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn" onClick={addToCart}>
                                    Add to Cart
                                </motion.button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="tab__wrapper d-flex align-items-center gap-5">
                                <h6 className={`${tab === "desc" ? "active__tab" : ""}`} onClick={() => setTab("desc")}>
                                    Description</h6>
                                <h6 className={`${tab === "rev" ? "active__tab" : ""}`} onClick={() => setTab("rev")}>
                                    Reviews
                                </h6>
                            </div>

                            {
                                tab === "desc" ? (
                                    <div className="tab__content mt-5">
                                        <p>{products?.description}</p>
                                    </div>
                                ) : (
                                    <div className="product__review mt-5">
                                        <div className="review__wrapper">
                                            {/* <ul>
                                                {
                                                    reviews?.map((item, index) => (
                                                        <li kew={index} className="mb-4">
                                                            <h6>Jenni Kim</h6>
                                                            <span>{item.rating} ( rating)</span>
                                                            <p>{item.text}</p>
                                                        </li>
                                                    ))}
                                            </ul> */}
                                            <div className="review__form">
                                                <h4>Leave your experience</h4>


                                                {
                                                    products?.cmt.map((item) => {
                                                        return (<>
                                                            <div>

                                                                <div class="verified_customer_section">
                                                                    <div class="image_review">
                                                                        <div class="customer_image">
                                                                            <img src={item?.photoURL} />
                                                                        </div>

                                                                        <div class="customer_name_review_status">
                                                                            <div class="customer_name">{item?.displayName}</div>
                                                                            <div class="customer_review">
                                                                                {item?.rating} <i class="ri-star-s-fill"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="customer_comment">{item?.comment}</div>
                                                                </div>
                                                            </div>
                                                        </>)
                                                    })
                                                }
                                                <div >


                                                    <div className="form__group d-flex align-items-center gap-5 rating__group">
                                                        <motion.span className={rating == 1 ? "bg-warning rounded-circle p-2" : ""} whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>
                                                            1<i class="ri-star-s-fill"></i>
                                                        </motion.span>
                                                        <motion.span className={rating == 2 ? "bg-warning rounded-circle p-2" : ""} whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>
                                                            2<i class="ri-star-s-fill"></i>
                                                        </motion.span>
                                                        <motion.span className={rating == 3 ? "bg-warning rounded-circle p-2" : ""} whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>
                                                            3<i class="ri-star-s-fill"></i>
                                                        </motion.span>
                                                        <motion.span className={rating == 4 ? "bg-warning rounded-circle p-2" : ""} whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>
                                                            4<i class="ri-star-s-fill"></i>
                                                        </motion.span>
                                                        <motion.span className={rating == 5 ? "bg-warning rounded-circle p-2" : ""} whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>
                                                            5<i class="ri-star-s-fill"></i>
                                                        </motion.span>
                                                    </div>

                                                    <div className="form__group">
                                                        <textarea ref={reviewMsg} rows={4} type="text" placeholder="Review message...." required />
                                                    </div>
                                                    <motion.button whileTap={{ scale: 1.2 }} onClick={handleChangeComment} className="buy__btn">Submit</motion.button>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )
                            }


                        </Col>
                        <Col lg="12" className="mt-5">
                            <h2 className="related__title">You might also like</h2>
                        </Col>

                        <ProductsList data={relatedProducts} />
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
};

export default ProductDetails;