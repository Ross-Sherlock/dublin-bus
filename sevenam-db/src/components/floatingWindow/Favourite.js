import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./Favourite.css";
import Typography from "@mui/material/Typography";
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
    console.log(index);
  }

  function unfavourite() {
    let current = JSON.parse(localStorage.getItem("favourites"));
    current.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(current));
    setFav(current);
    console.log(current);
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
      <div className="fav-icon">
      <FavoriteIcon
        onClick={unfavourite}
        style={{ color: "#fe616f" }}
        fontSize="inherit"
      ></FavoriteIcon>
      </div>
      {/* <button onClick={set}>TEST</button> */}
    </div>
  );
};

export default Favourite;
