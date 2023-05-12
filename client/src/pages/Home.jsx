import React, { useEffect, useState } from 'react';
import Cards from '../components/Cards';
import Container from 'react-bootstrap/Container';
import Carousels from '../components/Carousels';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from "react-redux"
import { addProduct, filterVegProduct } from '../redux/foodItemSlice';
import Button from 'react-bootstrap/esm/Button';



// base url
const baseUrl = 'http://localhost:8080';

const Home = () => {
    const product = useSelector(state => state.foodItemSlice)
    const dispatch = useDispatch();

    const [foodType, setfoodType] = useState(null);
    const [checkedVeg, setCheckedVeg] = useState(false);
    const [checkedNonVeg, setCheckedNonVeg] = useState(false);

    useEffect(() => {
        // fetching food items
        const getFoodItems = async () => {
            const res = await axios.get(`${baseUrl}/food/getFoodItems`);
            dispatch(addProduct(res.data.foodItems));
        };
        getFoodItems();
    }, [])

    // handleChange function
    const handleChange = (e) => {
        setfoodType(e.target.value);
        if (checkedNonVeg) {
            setCheckedVeg(true);
            setCheckedNonVeg(false);
        }
        if (checkedVeg) {
            setCheckedVeg(false);
            setCheckedNonVeg(true);
        }
    };

    // submitHandler function
    const submitHandler = () => {
        dispatch(filterVegProduct(foodType));
    };

    // resetHandler function
    const resetHandler = () => {
        setfoodType(null);
        setCheckedNonVeg(false);
        setCheckedVeg(false);
    };

    return (
        <>
            <Header />
            <div style={{ minHeight: "80vh" }} className='mb-2'>
                <Carousels />

                <div className='bg-danger text-white mt-2 mb-2 fw-bolder fs-3'>
                    <Form className='d-flex justify-content-evenly align-items-center  w-50 m-auto' >
                        <Form.Check checked={checkedVeg} onChange={handleChange} name="foodtype" label="Veg" value="veg" type="checkbox" aria-label="radio 1" />
                        <Form.Check checked={checkedNonVeg} onChange={handleChange} name="foodtype" label="Non Veg" value="non veg" type="checkbox" aria-label="radio 1" />
                        <Button className='m-2' onClick={submitHandler}> Filter </Button>
                        <Button className='m-2' onClick={resetHandler}> Reset </Button>
                    </Form>
                </div>

                <Container fluid>
                    <Row>
                        {/* all food Items */}
                        {product.allFood.length > 0 && foodType === null && product.allFood.map(item => (
                            <Col key={item._id}>
                                <Cards items={item} />
                            </Col>
                        ))}
                        {/* veg food items */}
                        {product.allFood.length > 0 && foodType === "veg" && product.vegProduct.map(item => (
                            <Col key={item._id}>
                                <Cards items={item} />
                            </Col>
                        ))}
                        {/* non veg food items */}
                        {product.allFood.length > 0 && foodType === "non veg" && product.nonVegProduct.map(item => (
                            <Col key={item._id}>
                                <Cards items={item} />
                            </Col>
                        ))}
                    </Row>

                </Container>
            </div>
            <Footer />
        </>
    )
}

export default Home