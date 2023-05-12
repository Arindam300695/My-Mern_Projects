import React, { useEffect } from 'react';
import Header from "../components/Header"
import Footer from '../components/Footer';
import { useDispatch, useSelector } from "react-redux";
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { MdDeleteForever } from 'react-icons/md';
import { deleteProductFromCart, emptyCart } from '../redux/foodItemSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/");

    }, [])

    const cart = useSelector(state => state.foodItemSlice.cart);

    const productCount = useSelector(state => state.foodItemSlice.productCount);
    const dispatch = useDispatch();

    let price = 0;
    cart.length > 0 && cart.forEach(item => {
        price += item.totalPrice[0]
    });

    // deleteProductHandler function
    const deleteProductHandler = (id) => {
        dispatch(deleteProductFromCart(id));
    };

    //checkoutHandler function
    const checkoutHandler = () => {
        dispatch(emptyCart());
        toast.success("Thanks for shopping with us, Your order will be delivered soon", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    };

    return (
        <>
            <Header />
            {productCount === 0 ? <div style={{ width: "50%", minHeight: "80vh" }} className='text-center mb-2 m-auto'>
                <h2 style={{ marginTop: "30%" }}>
                    Your Cart is Empty, Please visit home page and add some food Item to instantly fullfilling your cravings!!!!
                </h2>
            </div>
                :
                <div style={{ minHeight: "80vh" }} className='mb-2'>
                    <Stack gap={3}>
                        {cart.map(item => (
                            <div key={item.id} className="bg-warning border d-flex jsuti-content-evenly align-items-center gap-2">
                                <Image src={item.image[0].url} roundedCircle width="150px" />
                                <h3>{item.name}</h3>
                                <div>Quantity : <h5 style={{ display: "inline" }}>{item.productQuantity}</h5></div>
                                <div>Size : <h5 style={{ display: "inline" }}>{item.productDisSize}</h5></div>
                                <div>Total Price : <h5 style={{ display: "inline" }}>{item.totalPrice[0]}</h5></div>
                                <MdDeleteForever onClick={() => { deleteProductHandler(item.id) }} className='fw-bolder text-danger' style={{ fontSize: "3rem" }} />
                            </div>
                        ))}
                        <div className="bg-warning border d-flex justify-content-evenly p-3">
                            <h3 className='text-center'>Total Amount to be paid:{price}</h3>
                            <Button onClick={checkoutHandler}>Checkout</Button>
                        </div>
                    </Stack>
                </div>}
            <ToastContainer />
            <Footer />
        </>
    )
}

export default Cart