import React, { Component } from "react";
import GeoLocation from "./GeoLocation";
import SwitchLang from "../../containers/lang/SwitchLang";

class Header extends Component {

  render() {
    return (
        <div>
          <SwitchLang />
          <GeoLocation />
        </div>
    );
  }
}

export default Header;
