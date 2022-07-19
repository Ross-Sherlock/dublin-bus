import React from "react";

const NewsTwitter = () => {

//Directly return fetch results from taggbox service
  const src="https://widget.taggbox.com/102061";
  const iframe_style = {
    width: "100vh",
    height: "100vh",
    overflow: "auto",
    border: "none"
  }
  const title="Dublin Bus Twitter"

  return (
    <iframe src={src} style={iframe_style} title={title}></iframe>
  )
}

export default NewsTwitter;