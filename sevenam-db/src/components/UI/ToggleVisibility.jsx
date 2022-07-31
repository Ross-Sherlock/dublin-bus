import React, { useState } from "react";
import { FaBorderNone } from "react-icons/fa";

export default function ToggleVisibility({ children }) {
  // React state to manage visibility
  const [show, setShow] = useState(true);


  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  }
  var buttonText = show ? "TEST" : "TEST";
  var text = show ? "flex" : "none";

  return (
    <div className="component-container">
      {show && children}
      <button style={{display:text}} onClick={toggleShow}>{buttonText}</button>
    </div>
  );
}
