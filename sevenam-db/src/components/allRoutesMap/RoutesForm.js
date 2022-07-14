import React from 'react';
import { useState, useRef } from "react";
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns"


const RoutesForm = () => {

  return (
      <div className="window-container">
        <label>Select Route</label>
        <div className="route-input">
            <DropDownListComponent></DropDownListComponent>
        </div>

        <div className="route-input">
            <DropDownListComponent></DropDownListComponent>
        </div>

        <div className="route-submit">
          {/* <button classNmae="" onClick={}>
            <img
              src="https://cdn1.iconfinder.com/data/icons/ios-edge-line-6/25/Location-Arrow-Crcle-512.png"
              width="40"
              height="auto"
              alt="submit"
            />
          </button>
          <button class="btn btn-primary" onClick={}>
            Search
          </button> */}
        </div>

      </div>
  );
};

export default RoutesForm;
