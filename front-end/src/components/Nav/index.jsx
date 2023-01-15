import React from "react";
import "./nav.css";
import logo from "../../assets/logo.png";
import { useAuth } from "../../AuthContext";
const index = () => {
  const { user } = useAuth();
  return (
    <div className="nav-wrapper">
      <div className="logo-wrapper">
        <img src={logo} />
        <h2>Filter Pixel</h2>
      </div>

      {user ? (
        <h3 style={{ display: "flex", alignItems: "center" }}>
          Hi {user.name}{" "}
          <img
            style={{ height: "2rem", borderRadius: "50%", marginLeft: "1rem" }}
            src={
              localStorage.getItem("img-url")
                ? localStorage.getItem("img-url")
                : "https://www.w3schools.com/howto/img_avatar.png"
            }
          ></img>
        </h3>
      ) : (
        <button>Signup</button>
      )}
    </div>
  );
};

export default index;
