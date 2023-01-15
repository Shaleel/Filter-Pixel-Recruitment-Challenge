import React from "react";
import "./image.css";
const Image = ({ src }) => {
  return (
    <div
      className="img"
      style={{
        background: "#2E2E2E",
        borderRadius: "0.5rem",
        padding: "0.5rem",
      }}
    >
      <div
        style={{
          background: "url('" + src + "')",
          backgroundSize: "cover",
          margin: "auto",
          marginBottom: "1rem",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
        }}
      ></div>
    </div>
  );
};

export default Image;
