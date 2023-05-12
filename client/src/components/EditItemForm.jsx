import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";
import Header from './Header';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';

// base url
const baseUrl = 'http://localhost:8080';

const EditItemForm = () => {
    const navigate = useNavigate();
    const itemToBeEdited = useSelector(state => state.foodItemSlice.itemToBeEdited);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/");
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                if (user.email !== "ari1995@admin.com") navigate("/");
            }
        }

        if (token) setToken(token);
    }, []);

    const [token, setToken] = useState("");


    const [foodData, setFoodData] = useState({
        _id: itemToBeEdited[0]._id,
        categoryName: itemToBeEdited[0].categoryName,
        name: itemToBeEdited[0].name,
        description: itemToBeEdited[0].description,
        variety: {
            small: itemToBeEdited[0].variety[0].small,
            medium: itemToBeEdited[0].variety[0].medium,
            large: itemToBeEdited[0].variety[0].large
        },
        image: ''
    });

    // submitHamdler function
    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await axios.patch(`${baseUrl}/food/editFoodItem`, foodData, {
            headers: {
                Authorization: token,
            }
        })

        if (res.status === 201) toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        if (res.status === 200) toast.warning(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        if (res.status === 500) toast.error(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        if (res.data.message === "food item updated successfully") navigate("/")
    };

    return (
        <>
            <Header />
            <Form onSubmit={submitHandler} className='d-flex flex-column align-items-center justify-content-center gap-1 m-auto'>

                {/* food category */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Catrgory</Form.Label>
                    <Form.Control type="text" placeholder='Food Category i.e. Veg or Non Veg' value={foodData.categoryName} onChange={(e) => { setFoodData({ ...foodData, categoryName: e.target.value }) }} />
                </Form.Group>

                {/* food name */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Food Name</Form.Label>
                    <Form.Control type="text" placeholder='Food Name' value={foodData.name} onChange={(e) => { setFoodData({ ...foodData, name: e.target.value }) }} />
                </Form.Group>

                {/* food description */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder='description.....' value={foodData.description} onChange={(e) => { setFoodData({ ...foodData, description: e.target.value }) }} />
                </Form.Group>

                {/* food variety */}
                {/* small */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Select aria-label="Default select example">
                        <option value="small">Small</option>
                    </Form.Select>
                    <Form.Control type="text" placeholder="Price" value={foodData.variety.small} onChange={(e) => { setFoodData({ ...foodData, variety: { ...foodData.variety, small: e.target.value } }) }} />
                </Form.Group>

                {/* medium */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Select aria-label="Default select example">
                        <option value="medium">Medium</option>
                    </Form.Select>
                    <Form.Control type="number" placeholder="Price" value={foodData.variety.medium} onChange={(e) => { setFoodData({ ...foodData, variety: { ...foodData.variety, medium: e.target.value } }) }} />
                </Form.Group>

                {/* large */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Select aria-label="Default select example">
                        <option value="large">Large</option>
                    </Form.Select>
                    <Form.Control type="number" placeholder="Price" value={foodData.variety.large} onChange={(e) => { setFoodData({ ...foodData, variety: { ...foodData.variety, large: e.target.value } }) }} />
                </Form.Group>

                {/* food image */}
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                    <Form.Label>Choose an Image of the Food Item</Form.Label>
                    <Form.Control type="file" onChange={(e) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(e.target.files[0]);
                        reader.onloadend = () => {
                            setFoodData({ ...foodData, image: reader.result })
                        };
                    }} />
                </Form.Group>

                <button className='btn btn-success m-2'>Edit</button>
            </Form>
            <Footer />
            <ToastContainer />
        </>
    )
}

export default EditItemForm