import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// base url
const baseUrl = "http://localhost:8080";

const AddFoodItem = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/");
        if (token) {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                if (user.email !== "ari1995@admin.com") navigate("/");
            }
        }
        if (token) setToken(token);
    }, []);

    const [token, setToken] = useState("");
    const [foodData, setFoodData] = useState({
        categoryName: "",
        name: "",
        description: "",
        variety: {
            small: "",
            medium: "",
            large: "",
        },
        image: "",
    });

    //  submitHandler function
    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${baseUrl}/food/addItem`, foodData, {
            headers: {
                Authorization: token,
            },
        });

        if (res.status === 201)
            toast.success(res.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        if (res.status === 200)
            toast.warning(res.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        if (res.status === 500)
            toast.error(res.data.message, res.data.error, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        if (res.data.message === "food item added successfully") navigate("/");
    };

    return (
        <>
            <Header />
            <div style={{ minHeight: "80vh" }} className="mb-2">
                <Form
                    onSubmit={submitHandler}
                    className="d-flex flex-column align-items-center justify-content-center gap-1 m-auto"
                >
                    {/* food category */}
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>Catrgory</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Category"
                            value={foodData.categoryName}
                            onChange={(e) => {
                                setFoodData({
                                    ...foodData,
                                    categoryName: e.target.value,
                                });
                            }}
                        />
                    </Form.Group>

                    {/* food name */}
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput2"
                    >
                        <Form.Label>Food Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Food Name"
                            value={foodData.name}
                            onChange={(e) => {
                                setFoodData({
                                    ...foodData,
                                    name: e.target.value,
                                });
                            }}
                        />
                    </Form.Group>

                    {/* food description */}
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={foodData.description}
                            onChange={(e) => {
                                setFoodData({
                                    ...foodData,
                                    description: e.target.value,
                                });
                            }}
                        />
                    </Form.Group>

                    {/* food variety */}
                    {/* small */}
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput3"
                    >
                        <Form.Select aria-label="Default select example">
                            <option value="small">Small</option>
                        </Form.Select>
                        <Form.Control
                            type="text"
                            placeholder="Price"
                            value={foodData.variety.small}
                            onChange={(e) => {
                                setFoodData({
                                    ...foodData,
                                    variety: {
                                        ...foodData.variety,
                                        small: e.target.value,
                                    },
                                });
                            }}
                        />
                    </Form.Group>

                    {/* medium */}
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput3"
                    >
                        <Form.Select aria-label="Default select example">
                            <option value="medium">Medium</option>
                        </Form.Select>
                        <Form.Control
                            type="number"
                            placeholder="Price"
                            value={foodData.variety.medium}
                            onChange={(e) => {
                                setFoodData({
                                    ...foodData,
                                    variety: {
                                        ...foodData.variety,
                                        medium: e.target.value,
                                    },
                                });
                            }}
                        />
                    </Form.Group>

                    {/* large */}
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput3"
                    >
                        <Form.Select aria-label="Default select example">
                            <option value="large">Large</option>
                        </Form.Select>
                        <Form.Control
                            type="number"
                            placeholder="Price"
                            value={foodData.variety.large}
                            onChange={(e) => {
                                setFoodData({
                                    ...foodData,
                                    variety: {
                                        ...foodData.variety,
                                        large: e.target.value,
                                    },
                                });
                            }}
                        />
                    </Form.Group>

                    {/* food image */}
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput8"
                    >
                        <Form.Label>
                            Choose an Image of the Food Item
                        </Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Category"
                            onChange={(e) => {
                                const reader = new FileReader();
                                reader.readAsDataURL(e.target.files[0]);
                                reader.onloadend = () => {
                                    setFoodData({
                                        ...foodData,
                                        image: reader.result,
                                    });
                                };
                            }}
                        />
                    </Form.Group>

                    <button className="btn btn-success">Add</button>
                </Form>
            </div>
            <ToastContainer />
            <Footer />
        </>
    );
};

export default AddFoodItem;
