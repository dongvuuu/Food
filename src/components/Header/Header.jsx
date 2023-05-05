import React, { useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";

import { motion } from "framer-motion";

import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import { Container, Nav, Row } from 'reactstrap';
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { adminUser, auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    },
];

const Header = () => {

    const headerRef = useRef(null);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const profileActionRef = useRef(null);

    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    // console.log(currentUser.email)

    const stickyHeaderFunc = () => {
        window.addEventListener("scroll", () => {
            if (
                document.body.scrollTop > 80 || document.documentElement.scrollTop > 80

            ) {
                headerRef.current.classList.add("sticky__header");
            } else {
                headerRef.current.classList.remove("sticky__header");
            }
        });
    };

    const logout = () => {

        signOut(auth).then(() => {
            toast.success("Logged out");
            navigate("/home");
        }).catch(err => {
            toast.error(err.message);
        })
    }




    useEffect(() => {
        stickyHeaderFunc();

        return () => window.removeEventListener("scroll", stickyHeaderFunc);
    });
    // 
    const menuToggle = () => menuRef.current.classList.toggle("active__menu");

    const navigateToCart = () => {
        navigate("/cart");
    };

    //
    const toggleProfileActions = () => {
        profileActionRef.current.classList.toggle("show__profileActions")
        console.log("s")
    }

    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <NavLink to="/">

                            <div className="logo">
                                <img src={logo} alt="logo" />
                                <div>
                                    <h1>f 0_0 d</h1>
                                </div>
                            </div>
                        </NavLink>
                        <div className="navigation" ref={menuRef} onClick={menuToggle}>
                            <motion.ul className="menu">
                                {
                                    nav__links.map((item, index) => (
                                        <li className="nav__item" key={index}>
                                            <NavLink
                                                to={item.path}
                                                className={(navClass) =>
                                                    navClass.isActive ? "nav__active" : ""
                                                }
                                            >
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    ))}
                            </motion.ul>

                        </div>

                        <div className="nav__icons">
                            <span className="fav__icon">
                                <i class="ri-heart-line"></i>
                                <span className="badge">2</span>
                            </span>
                            <span className="cart__icon" onClick={navigateToCart}>
                                <i class="ri-shopping-bag-line"></i>
                                <span className="badge">{totalQuantity}</span>
                            </span>


                            <div className="profile">
                                <motion.img
                                    whileTap={{ scale: 1.2 }}
                                    src={currentUser ? currentUser.photoURL : userIcon}
                                    alt=""
                                    // ref={profileActionRef}
                                    onClick={function () {
                                        console.log("x")
                                        profileActionRef.current.classList.toggle("show__profileActions")
                                    }}
                                />
                                <div
                                    className="profile__actions "
                                    onClick={toggleProfileActions}
                                    ref={profileActionRef}
                                >
                                    {currentUser ? (
                                        <div className="d-flex align-items-center justify-content-center flex-column">
                                            {adminUser.includes(currentUser?.email) ?
                                                <>
                                                    <span className="btn-nav ">
                                                        <NavLink to={"/dashboard"} >Dashboard</NavLink>
                                                    </span>
                                                    <span className="btn-nav ">
                                                        <NavLink to={"/dashboard/add-product"} >Add Product</NavLink>
                                                    </span>
                                                </>
                                                :
                                                <div className="d-flex align-items-center justify-content-center flex-column">
                                                    {/* <Link to="/signup">Signup</Link>
                                                <Link to="/login">Login</Link>
                                                <Link to="/dashboard">Dashboard</Link> */}
                                                </div>
                                            }
                                            <span className="btn-nav " onClick={logout}>Logout</span>

                                        </div>) :
                                        (<>
                                            <div className="d-flex align-items-center  flex-column">
                                                <span className="btn-nav ">
                                                    <Link to="/signup">Signup</Link>

                                                </span>
                                                <span className="btn-nav ">

                                                    <Link to="/login">Login</Link>
                                                </span>

                                            </div>
                                        </>)}
                                    {/* {adminUser.includes(currentUser?.email) ? <span onClick={logout}>Logout</span> : <div className="d-flex align-items-center justify-content-center flex-column">
                                        <Link to="/signup">Signup</Link>
                                        <Link to="/login">Login</Link>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </div>
                                    } */}
                                </div>

                            </div>

                            <div className="mobile__menu">

                                <span onClick={menuToggle}>
                                    <i class="ri-menu-line"></i>
                                </span>
                            </div>
                        </div>

                    </div>
                </Row>
            </Container>
        </header >
    )
};

export default Header;