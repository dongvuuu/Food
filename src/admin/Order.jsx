import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import moment from "moment";
const Order = () => {
  const { data: Data, loading } = useGetData("orders");
  console.log(Data);
  const deleteOrder = async (id) => {
    await deleteDoc(doc(db, "orders", id));
    toast.success("orders deleted.!");
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="fw-bold">Order</h4>
          </Col>
          <Col lg="12" className="pt-5">
            {Data?.map((i) => {
              return (
                <>
                  <div className="border border-success rounded m-2">
                    <div className="d-flex">
                      <table className="table">
                        <thead>
                          <tr className="d-flex justify-content-between align-items-center">
                            <th className="d-flex justify-content-start align-items-start">
                              <button
                                className="btn btn-danger justify-content-center align-items-center"
                                onClick={() => {
                                  deleteOrder(i.id);
                                }}
                              >
                                X
                              </button>
                            </th>
                            <th>Name: {i?.displayName}</th>
                            <th>Eamil: {i?.email}</th>
                            <th>Phone: {i?.phone}</th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    <div className="d-flex">
                      <table className="table">
                        <thead>
                          <tr className="justify-content-center ">
                            <th>Address: {i?.address}</th>
                            <th>City: {i?.city}</th>
                            <th>Total: $ {i?.totalAmount}</th>
                            <th>
                              Date:
                              {i?.createdAt.toDate()?.toDateString()} {"  "}
                            </th>
                            <th>
                              Time: {i?.createdAt.toDate()?.getHours()} :
                              {i?.createdAt.toDate()?.getMinutes()}
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                    {i?.cartItems.map((i) => {
                      return (
                        <div class="card rounded-3 bg-info">
                          <div class="card-body ">
                            <div class="row d-flex justify-content-between align-items-center">
                              <div class="col-md-1 ">
                                <img
                                  src={i?.imgUrl}
                                  class="img-fluid rounded-3"
                                  alt="Cotton T-shirt"
                                />
                              </div>
                              {/* <div class="col-md-3 col-lg-3 col-xl-3">
                                                            <p class="lead fw-normal mb-2">{i?.productName}</p>
                                                            <p><span class="text-muted">Size: </span>M <span class="text-muted">Color: </span>Grey</p>
                                                        </div> */}
                              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button
                                  class="btn btn-link px-2"
                                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                >
                                  <i class="fas fa-minus"></i>
                                </button>

                                <input
                                  disabled
                                  id="form1"
                                  min="0"
                                  name="quantity"
                                  value={i?.quantity}
                                  type="number"
                                  class="form-control form-control-sm"
                                />

                                <button
                                  class="btn btn-link px-2"
                                  onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                >
                                  <i class="fas fa-plus"></i>
                                </button>
                              </div>
                              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h5 class="mb-0">${i?.totalPrice}</h5>
                              </div>
                              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                                <a href="#!" class="text-danger">
                                  <i class="fas fa-trash fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Order;