import React, { useEffect, useState } from "react";
import Image from "./Image";

const DriveImages = () => {
  const [images, setimages] = useState([]);
  useEffect(() => {
    async function fetchImages() {
      let response = await fetch(
        `http://localhost:8000/images/get-from-aws-S3`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ).then((response) => response.json());

      setimages(response);
    }

    fetchImages();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
      {images.length > 0 ? (
        images.map((image, key) => <Image src={image} key={key} />)
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};

export default DriveImages;
