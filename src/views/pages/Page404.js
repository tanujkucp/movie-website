import React, {Component, useEffect, useState} from 'react';
import {Col, Container, Row} from 'reactstrap';
import Header from "../widgets/Header";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import WaveBorder from "../widgets/WaveBorder";
import Footer from "../widgets/Footer";
import configs from "../../configs";
import Typography from "@material-ui/core/Typography/Typography";
import Link from "@material-ui/core/Link";
import axios from "axios";
import Card from "@material-ui/core/Card/Card";

class Page404 extends Component {
    state = {
        ad: {}
    }

    componentDidMount() {
        axios.post(configs.server_address + '/getAd', {page: '404'}).then(res => {
            if (res.data.success && res.data.data.enabled) {
                this.setState({ad: res.data.data});
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Header/>

                <div style={{
                    backgroundColor: "#cfd8dc",
                    paddingTop: 10,
                    paddingBottom: 150,
                    justifyContent: 'center',
                    display: 'flex'
                }}>
                    <Container>
                        {this.state.ad ? (
                            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10}}>
                                <Card elevation={5} style={{
                                    display: 'flex',
                                    width: '60%',
                                    aspectRatio: 1,
                                }}>
                                    <Link href={this.state.ad.link} rel="noopener noreferrer" target="_blank">
                                        <img height={undefined} width={'100%'}
                                             src={this.state.ad.image}/>
                                    </Link>
                                </Card>
                            </div>
                        ) : null}
                        <Row className="justify-content-center">
                            <Col md="6">
                                <div className="clearfix">
                                    <h1 className="float-left display-3 mr-4">404</h1>
                                    <h4 className="pt-3">Oops! You're lost.</h4>
                                    <p className="text-muted float-left">The page you are looking for was not found.</p>
                                </div>

                            </Col>
                        </Row>
                        <Row className={'justify-content-center'}>
                            <Typography variant="h5" color="textPrimary" gutterBottom>
                                You can view our <Link href={configs.website_address}> Home
                                Page </Link> for more awesome content.
                            </Typography>
                        </Row>
                    </Container>
                </div>
                {/* Footer */}
                <WaveBorder
                    upperColor="#cfd8dc"
                    lowerColor={'rgb(36, 40, 44)'}
                    animationNegativeDelay={4}
                />
                <Footer/>
                {/* End footer */}
            </React.Fragment>
        );
    }
}

export default Page404;
