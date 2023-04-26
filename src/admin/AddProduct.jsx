import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup as div } from "reactstrap";
import { toast } from "react-toastify";

import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


import Swal from 'sweetalert2'
const AddProduct = () => {

    const [enterTitle, setEnterTitle] = useState("");
    const [enterShortDesc, setEnterShortDesc] = useState("");
    const [enterDescription, setEnterDescription] = useState("");
    const [enterCategory, setEnterCategory] = useState("");
    const [enterPrice, setEnterPrice] = useState("");
    const [enterProductImg, setEnterProductImg] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {

        console.table(enterTitle, enterShortDesc, enterDescription, enterCategory, enterPrice, enterProductImg)
    }, [enterTitle, enterShortDesc, enterDescription, enterCategory, enterPrice, enterProductImg])
    const addProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        // const product = {
        //     title: enterTitle,
        //     shortDesc: enterShortDesc,
        //     description: enterDescription,
        //     category: enterCategory,
        //     price: enterPrice,
        //     imgUrl: enterProductImg,
        // }

        //-------add product to the firebase database------
        try {
            const docRef = await collection(db, "products")

            const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg)
            console.log(uploadTask)
            uploadTask.on(() => {
                toast.error("Images not uploaded")
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                    await addDoc(docRef, {
                        title: enterTitle,
                        shortDesc: enterShortDesc,
                        description: enterDescription,
                        category: enterCategory,
                        price: enterPrice,
                        imgUrl: downloadURL,
                        cmt: []
                    });
                });

            });
            setLoading(false);
            toast.success("Product successfully added");
            navigate("/dashboard/all-products");
        } catch (error) {
            setLoading(false);
            toast.error("Product not added");
        }


        // console.log(product);
    }

    const upload = (e) => {
        Swal.fire({
            title: 'Are you sure?',
            text: enterTitle + "" + enterShortDesc + "" + enterDescription + "" + enterCategory + "" + enterPrice + "" + enterProductImg,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                addProduct(e)
            }
        })
    }
    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {
                            loading ? <h4 className="py-5">Loading.....</h4> : <>

                                <h4 className="mb-5">Add Product</h4>
                                <div >
                                    <div className="form__group">
                                        <span>Product title</span>
                                        <input type="text" placeholder="Hamburger" value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required />
                                    </div>
                                    <div className="form__group">
                                        <span>Short Description</span>
                                        <input type="text" placeholder="It's taste like..." value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} required />
                                    </div>

                                    <div className="form__group">
                                        <span>Description</span>
                                        <input type="text" placeholder="Description..." value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required />
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between gap-5">
                                        <div className="form__group w-50">
                                            <span>Price</span>
                                            <input type="number" placeholder="$100" value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required />
                                        </div>
                                        <div className="form__group w-50">
                                            <span>Category</span>
                                            <select className="w-100 p-2"
                                                value={enterCategory}
                                                onChange={e => setEnterCategory(e.target.value)}>
                                                <option>Select category</option>
                                                <option value="fast food">Fast Food</option>
                                                <option value="ice cream">Ice Cream</option>
                                                <option value="drink">Drink</option>
                                                <option value="fruits">Fruits</option>
                                                <option value="candy">Candy</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="form__group">
                                            <span>Product Image</span>
                                            <input type="file" onChange={e => setEnterProductImg(e.target.files[0])} required />
                                        </div>
                                    </div>

                                </div>
                                <button onClick={addProduct} className="buy__btn" type="submit">Add Product</button>
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AddProduct;