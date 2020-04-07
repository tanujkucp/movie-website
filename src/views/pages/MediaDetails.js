import React, {Component} from 'react';

import Header from './../widgets/Header';
import Footer from './../widgets/Footer';


class MediaDetails extends Component {
    render() {
        const { params } = this.props.match;
        return (
            <div>
                MediaDetails: {params.id}
            </div>
        );
    }
}

export default MediaDetails;
