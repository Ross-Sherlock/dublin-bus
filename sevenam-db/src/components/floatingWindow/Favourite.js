import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import "./Favourite.css";
import DirectionsIcon from "@mui/icons-material/Directions";

const Favourite = (props) => {
  let dest = props.dest;
  let origin = props.origin;
  let originRef = props.originRef;
  let destRef = props.destRef;
  let setSearch = props.setSearch;
  let index = props.index;
  let setFav = props.setFav;

  function set() {
    setSearch(origin, dest);
  }

  function unfavourite() {
    let current = JSON.parse(localStorage.getItem("favourites"));
    current.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(current));
    setFav(current);
  }

  return (
    <div className="favourite-card">
        <div className="direct-icon">
      <DirectionsIcon
        fontSize="inherit"
        onClick={set}
      ></DirectionsIcon>
      </div>
      <div className="locations" onClick={set}>
        <p>{origin}</p>
        <p>{dest}</p>
      </div>
      <div className="remove-icon">
      <DeleteIcon
        onClick={unfavourite}
        style={{ color: "gray" }}
        fontSize="inherit"
      ></DeleteIcon>
      </div>
    </div>
  );
};

export default Favourite;
