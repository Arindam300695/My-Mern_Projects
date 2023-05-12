import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from "react-redux"
import { addProductToCart } from '../redux/foodItemSlice';
import { ToastContainer, toast } from 'react-toastify';

const Cards = ({ items }) => {
    const dispatch = useDispatch();
    const [quantity, setquantity] = useState(0);
    const [disSize, setdishSize] = useState(null);
    const [isChecked, setisChecked] = useState(false);
    const [cartData, setcartData] = useState({
        id: "",
        name: "",
        description: "",
        image: "",
        productDisSize: "",
        productQuantity: "",
        category: ""
    })
    // onchangeHandler function
    const onchangeHandler = (itemsData) => {
        setisChecked(!isChecked);
        setcartData({
            id: itemsData._id,
            name: itemsData.name,
            description: itemsData.description,
            category: itemsData.categoryName,
            image: itemsData.image,
            productDisSize: disSize,
            productQuantity: quantity,
            totalPrice: disSize === "small" && items.variety.map((eachItem) => (
                eachItem.small * quantity
            )) || disSize === "medium" && items.variety.map((eachItem) => (
                eachItem.medium * quantity
            )) || disSize === "large" && items.variety.map((eachItem) => (
                eachItem.large * quantity
            ))
        });
    };

    // submitHandler function
    const submitHandler = () => {
        toast.success("Added to Cart", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        dispatch(addProductToCart(cartData));
    };

    return (
        <>
            <Container>
                <Card className='bg-dark text-white fw-bold m-2' style={{ width: '18rem', maxHeight: "30rem", overflow: "hidden", overflowY: "scroll" }}>
                    <Card.Img variant="top" src={items.image[0].url} />
                    <Card.Body>
                        <h2>{items.categoryName}</h2>
                        <Card.Title>{items.name}</Card.Title>
                        <Card.Text>
                            {items.description}
                        </Card.Text>

                        {/* select quantity */}
                        <Form.Select onChange={(e) => { setquantity(e.target.value) }} className='bg-danger fw-bold text-white' aria-label="Default select example">
                            <option>Select Quantity</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                            <option value="5">Five</option>
                        </Form.Select>

                        {/* select dish size */}
                        <Form.Select onChange={(e) => { setdishSize(e.target.value) }} className='bg-danger fw-bold text-white' aria-label="Default select example">
                            <option>Select Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </Form.Select>

                        Total Price:
                        <div>
                            {/* calculating prices for small dish size */}
                            {disSize === "small" && items.variety.map((eachItem, index) => (
                                <h3 key={index}>{eachItem.small * quantity}</h3>
                            ))}
                            {/* calculating prices for medium dish size */}
                            {disSize === "medium" && items.variety.map((eachItem, index) => (
                                <h3 key={index}>{eachItem.medium * quantity}</h3>
                            ))}
                            {/* calculating prices for large dish size */}
                            {disSize === "large" && items.variety.map((eachItem, index) => (
                                <h3 key={index}>{eachItem.large * quantity}</h3>
                            ))}
                        </div>
                        <Form.Check
                            inline
                            label="Check to confirm..."
                            name="group1"
                            onChange={() => { onchangeHandler(items) }}
                        />
                        <Button disabled={!isChecked ? true : false} onClick={submitHandler} variant="primary">Add to Cart</Button>
                    </Card.Body>
                </Card>

                <ToastContainer />
            </Container>
        </>
    )
}

export default Cards