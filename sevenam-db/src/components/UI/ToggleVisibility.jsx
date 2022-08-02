import React, { useState } from "react";
import { FaBorderNone } from "react-icons/fa";

export default function ToggleVisibility(props) {
  // React state to manage visibility
  const [show, setShow] = useState(true);

  // function to toggle the boolean value
  function toggleShow() {
    setShow(!show);
  }

  function changeArrow() {
    let arrow;
    if (show) {
      arrow = ["material-symbols-outlined", "arrow_left"];
    } else {
      arrow = ["material-symbols-outlined", "arrow_right"];
    }
    return arrow;
  }

  let append = show ? "show" : "hide";
  let comp = props.content + "-" + append;
  let buttonClass = "side-panel-toggle " + append

  return (
    <div className={comp}>
      {show && props.children}
      <button
        className={buttonClass}
        id="side-panel-trigger"
        type="button"
        onClick={toggleShow}
      >
        <span className={changeArrow()[0]}>{changeArrow()[1]}</span>
      </button>
    </div>
  );
}