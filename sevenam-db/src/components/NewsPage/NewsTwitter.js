import React, { useState } from "react";
import "./NewsTwitter.css";
import CircularProgress from '@mui/material/CircularProgress';


const NewsTwitter = () => {

//Directly return fetch results from taggbox service
  const src="https://widget.taggbox.com/104332";
  const title="Dublin Bus Twitter"
  const [loading,setLoading] = useState(true);

  const hideSpinner = () => {
    setLoading(false);
  }

  return (
    <div className="news-container">
      {loading && <div className="news-progress"><CircularProgress/></div>}
      <iframe src={src} title={title} className="news-tweets" onLoad={hideSpinner}></iframe>
    </div>
  )
}

export default NewsTwitter;