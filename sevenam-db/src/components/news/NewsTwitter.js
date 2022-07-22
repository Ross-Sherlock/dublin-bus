import React from "react";
import "./NewsTwitter.css";

const NewsTwitter = () => {

//Directly return fetch results from taggbox service
  const src="https://widget.taggbox.com/102061";
  const title="Dublin Bus Twitter"

  return (
    <div className="news-container">
      <iframe src={src} title={title} className="news-tweets"></iframe>
    </div>
  )
}

export default NewsTwitter;