import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from "react-redux";
import Stack from 'react-bootstrap/esm/Stack';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { addProduct, deleteItem, editItem } from '../redux/foodItemSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// base url
const baseUrl = 'https://mern-food-delivery-app-dy3f.onrender.com';

const EditFoodItem = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const foodItem = useSelector(state => state.foodItemSlice.allFood);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/");
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                if (user.email !== "ari1995@admin.com") navigate("/");
            }
        }
        // fetching food items
        const getFoodItems = async () => {
            const res = await axios.get(`${baseUrl}/food/getFoodItems`);
            dispatch(addProduct(res.data.foodItems));
        };
        getFoodItems();
    }, [])

    // editHandler function
    const editHandler = (id) => {
        dispatch(editItem(id));
        setTimeout(() => {
            navigate("/editItemForm")
        }, 2000);
    };

    //deleteHandler function
    const deleteHandler = async (id) => {
        dispatch(deleteItem(id));
        const res = await axios.delete(`${baseUrl}/food/deleteFoodItem/${id}`);
        console.log(res.data)
        if (res.status === 201) toast.success(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        if (res.status === 200) toast.warning(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
        if (res.status === 500) toast.error(res.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    };

    return (
        <>
            <Header />
            <div style={{ minHeight: "80vh", margin: "1rem" }}>
                <Container fluid>
                    <Stack gap={3}>
                        <Row m={1}>
                            {foodItem.map(item => (
                                <Col>
                                    <div key={item._id} className="bg-warning border p-3 text-center">
                                        <h4>
                                            {item.name}
                                        </h4>
                                        <Image src={item.image[0].url} roundedCircle width="100px" />
                                        <BiEdit onClick={() => { editHandler(item._id) }} className='fs-3 text-danzer' />
                                        <RiDeleteBin2Line onClick={() => { deleteHandler(item._id) }} className='fs-3 text-danzer' />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Stack>
                </Container>

            </div>
            <Footer />
            <ToastContainer />
        </>
    )
}

export default EditFoodItem