import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';


export default class Carousel2 extends React.Component {
    render() {
        return (<div style={{width:'100%', paddingBottom: 20, paddingTop: 10}}>
                <Carousel interval={2000}>
                    {this.props.images.map((image) => (
                        <Carousel.Item key={image}>
                            <img
                                className="d-block w-100"
                                src={image}
                                alt="First slide"
                            />

                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        );
    }
}
