import React, { Component } from "react";
import PropTypes from "prop-types";
import {FormattedMessage} from 'react-intl';
import { connect } from "react-redux";
import _ from "lodash";
import { removeCity, changeDeg, updateCity } from "../../actions/cities";
import { getCityWeather } from '../../utils/apiUtils';
import CityItem from "./cityItem";


class CitiesList extends Component {
    constructor(props){
        super(props);
        this.onChangeDeg = this.onChangeDeg.bind(this);
    }

    componentDidMount(){
        let count = this.props.cities.length;

        for(let i = 0; i < count; i++){
            _.delay(() => {
                getCityWeather(this.props.cities[i].name)
                    .then(res => {
                        this.props.dispatch(updateCity(res.data, i));
                    })
                    .catch(e => console.log(e) )
            }, i * 400 + 100);
        }
    }

    onChangeDeg(){
        let deg = this.props.deg === 'C' ? 'F' : 'C';
        this.props.dispatch(changeDeg(deg));
    }

    onClickRemove(index){
        this.props.dispatch(removeCity(index));
    }

    render() {
        const deg = this.props.deg;
        const citiesCount = this.props.cities.length;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="">
                        {
                            citiesCount ?
                                <button onClick={this.onChangeDeg} className="btn btn-primary" style={{marginBottom: "15px"}}>
                                    <FormattedMessage id="city.deg" />
                                </button>: null
                        }
                    </div>
                    <ul className="list-group">
                        {
                            this.props.cities.map((city, index) => {
                                return (
                                        <li key={index} className="list-group-item justify-content-between">
                                            <CityItem  city={city} deg={deg} />
                                            <button onClick={() => this.onClickRemove(index) } className="btn btn-danger">
                                                <FormattedMessage id="city.remove" />
                                            </button>
                                        </li>
                                    )
                            })
                        }
                    </ul>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.cities,
        lang: state.locale.lang
    };
}

CitiesList.propTypes = {
    cities: PropTypes.array.isRequired,
    lang: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(CitiesList);
