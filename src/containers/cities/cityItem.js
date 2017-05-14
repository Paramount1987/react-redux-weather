import React from "react";

const CityItem = (props) => {
        return (
                 <div  style={{display: 'inline-block', marginRight: 5 + 'px'}}>
                     {props.city.name},
                     {props.deg === 'C' ? props.city.main.temp : props.city.main.fahrenheit} &deg;{props.deg}
                 </div>
        );
}

export default CityItem;
