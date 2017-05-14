import React, { Component } from "react";
import PropTypes from "prop-types";
import {FormattedMessage, intlShape, injectIntl} from 'react-intl';
import { connect } from "react-redux";
import _ from "lodash";
import { selectCity } from "../../actions/cities";

import { getCityWeather } from "../../utils/apiUtils";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            city: null
        };

        this.onSearchChange = this.onSearchChange.bind(this);
        this.showCityWeatherDebounce = _.debounce(this.showCityWeather, 500);
        this.showCityWeatherDebounce = this.showCityWeatherDebounce.bind(this);
        this.addCity = this.addCity.bind(this);
    }

    showCityWeather(city){
        getCityWeather(city)
            .then(res => this.setState({city: res.data}))
            .catch(e => this.setState({city: null}) )
    }

    onSearchChange(e){
        this.setState({text: e.target.value});
        this.showCityWeatherDebounce(e.target.value);
    }

    addCity(e){
        if(!this.state.city) return;
        e.preventDefault();
        this.props.dispatch(selectCity(this.state.city));
        this.setState({text:'',city: null});
    }

    render() {
        const {messages} = this.props.intl;

        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.addCity}>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   placeholder={ messages.placeholder }
                                   value={this.state.text}
                                   onChange={this.onSearchChange} />
                        </div>
                    </form>
                    {
                        this.state.city ?
                            <div>
                                <FormattedMessage id="search.found" />
                                {this.state.city.name}
                                <button onClick={this.addCity} className="btn btn-success" style={{marginLeft: "10px"}}>
                                    <FormattedMessage id="search.add" />
                                </button>
                            </div>
                            : null
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cities: state.cities,
        lang: state.locale.lang
    };
}

SearchBar.propTypes = {
  cities: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  lang: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

SearchBar.contextTypes = {
  store: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(SearchBar));
