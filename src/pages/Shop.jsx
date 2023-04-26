import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { collection, getDocs, where, query } from "firebase/firestore";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";

import "../styles/shop.css";
import useGetData from "../custom-hooks/useGetData.js";

// import products from "../assets/data/products";
import ProductsList from "../components/UI/ProductsList";

const Shop = () => {
    const { data: Allproducts } = useGetData("products");

    const [productsData2, setProductsData] = useState([])
    // const [Allproducts, setAllProductsData] = useState([])
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('')
    const collectionRef = filter == '' ? collection(db, "products") : query(collection(db, "products"), where("category", "==", filter));
    const collectionRef2 = collection(db, "products");


    console.log(Allproducts)
    useEffect(() => {
        const getData = async () => {
            const data = await getDocs(collectionRef)
            setData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            setProductsData(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        };

        getData();
    }, [filter]);
    // return { data };

    console.log(productsData2)
    // const handleFilter = e => {
    //     const filterValue = e.target.value
    //     if (filterValue === "sofa") {
    //         const filteredProducts = productsData2.filter(item => item.category == "sofa");
    //         setProductsData(filteredProducts);
    //     }

    //     if (filterValue === "mobile") {
    //         const filteredProducts = productsData2.filter((item) => item?.category == "mobile");
    //         setProductsData(filteredProducts);
    //         console.log(filteredProducts)
    //     }

    //     if (filterValue === "chair") {
    //         const filteredProducts = productsData2.filter(item => item.category == "chair");
    //         setProductsData(filteredProducts);
    //     }

    //     if (filterValue === "watch") {
    //         const filteredProducts = productsData2.filter(item => item.category === "watch");
    //         setProductsData(filteredProducts);
    //     }

    //     if (filterValue === "wireless") {
    //         const filteredProducts = productsData2.filter(item => item.category === "wireless");
    //         setProductsData(filteredProducts);
    //     }

    // };


    const handleSearch = e => {
        const searchTerm = e.target.value

        const searchedProducts = Allproducts?.filter(i => i.title.toLowerCase().includes(searchTerm.toLowerCase()))
        // filter == '' ? collection(db, "products") : query(collection(db, "products"), where("category", "==", filter));
        console.log(searchedProducts)
        if (searchedProducts == '' || searchTerm == '') {
            // searchedProducts(productsData2)
        } else
            setProductsData(searchedProducts)
    }
    return (
        <Helmet title="Shop">
            <CommonSection title="Products" />

            <section>
                <Container>
                    <Row>
                        <Col lg="3" md="6">
                            <div className="filter__widget">
                                <select

                                    onChange={(e) => setFilter(e.target.value)}>
                                    <option value=''>Filter By Category</option>
                                    <option value="fast food">Fast Food</option>
                                    <option value="ice cream">Ice Cream</option>
                                    <option value="drink">Drink</option>
                                    <option value="fruits">Fruits</option>
                                    <option value="candy">Candy</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="3" md="6" className="text-end">
                            <div className="filter__widget">
                                <select>
                                    <option>Sort By</option>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg="6" md="12">
                            <div className="search__box">
                                <input type="text" placeholder="Search......" onChange={handleSearch} />
                                <span>
                                    <i class="ri-search-line"></i>
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="pt-0">
                <Container>
                    <Row>
                        {
                            productsData2.length === 0 ? (
                                <h1 className="text-center fs-4 ">No products are found!</h1>
                            ) : (
                                <ProductsList data={productsData2} />
                            )}
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default Shop;