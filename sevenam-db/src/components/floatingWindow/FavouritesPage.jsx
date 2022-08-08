import React, { useState } from "react";
import Favourite from "./Favourite";
import "./FavouritesPage.css";
import { IoHeartSharp } from "react-icons/io5";
import Button from "@mui/material/Button";
import NotFound from './notfound.png';

const FavouritesPage = () => {
  let favouritesObj = [];
  let localFavs = localStorage.getItem("favourites");

  if (localFavs != null) {
    favouritesObj = JSON.parse(localStorage.getItem("favourites"));
  } else {
  }
  const [fav, setFav] = useState(favouritesObj);

  function dynamicFavourites() {
    const arr = [];
    if (favouritesObj.length > 0) {
      for (const [index, element] of favouritesObj.entries()) {
        arr.push(
          <Favourite
            key={element.origin + element.dest}
            index={index}
            origin={element.origin}
            dest={element.dest}
            setFav={setFav}
          ></Favourite>
        );
      }
    }
    return arr;
  }

  let jsxFavourites = dynamicFavourites();
  if (jsxFavourites.length == 0) {
    jsxFavourites = (
      <div className="notFoundContainer">
        <div><img src={NotFound} height={"100px"}></img></div>
        No favourites found! You can add favourite routes from the journey
        planner, just use <div className="exampleBtnDiv">
        <Button
          className="exampleFavBtn"
          variant="contained"
          color="success"
          style={{ backgroundColor: "#FFE882" }}
        >
          <IoHeartSharp />
        </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="favourites-body">
      <h2>Your Favourite Routes</h2>
      {jsxFavourites}
    </div>
  );
};

export default FavouritesPage;
