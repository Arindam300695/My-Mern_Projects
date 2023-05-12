import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Carousels = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            {/* <div style={{ zIndex: "100" }} className="w-100 d-flex gap-3 p-2 position-absolute top-50">
                <Form.Control style={{ opacity: "0.6", fontWeight: "bolder", textAlign: "center" }} type="text" placeholder="Serach for your cravings!!" />
                <Button variant="success">Search</Button>
            </div> */}

            <Carousel controls={false} activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://c.ndtvimg.com/2022-06/gp4k2jro_burgers_625x300_20_June_22.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350?im=FaceCrop,algorithm=dnn,width=1200,height=886"
                        alt="First slide"
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://1tsp.in/wp-content/uploads/2021/07/image-1.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://cdn.britannica.com/27/213427-050-869B98FE/Chicago-style-hot-dog.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>

            </Carousel>
        </>
    );
}

export default Carousels;