import React, { Component } from "react";
import {FormattedMessage} from 'react-intl';

import { getLocation, getLocationWeather } from '../../utils/apiUtils';

export default class GeoLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            error: null
        };
    }

    componentDidMount(){
      getLocation()
        .then(getLocationWeather)
        .catch(e => this.setState({error: e}) )
        .then(response => {
            this.setState({location: response.data});
        })
        .catch(e => console.log(e))
    }

    render() {
        const celsius = this.state.location ? this.state.location.main.temp : 0;
        const fahrenheit = celsius * 1.8 + 32;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="alert alert-info">
                            {this.state.location ?
                                <div>
                                    <FormattedMessage id="location.title" />
                                    {this.state.location.name}, {celsius} &deg;C / {fahrenheit} &deg;F
                                </div>
                                :
                                <div>Loading...</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
