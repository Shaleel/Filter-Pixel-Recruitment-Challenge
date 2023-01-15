import React, { useState } from "react";
import S3Images from "../../components/Image/S3Images";
import Nav from "../../components/Nav";
import TopTab from "./TopTab";

const Home = () => {
  const [tab, settab] = useState("s3");
  return (
    <div>
      <Nav />
      <TopTab tab={tab} settab={settab} />
      <div style={{ width: "80%", margin: "auto", marginTop: "1rem" }}>
        {tab == "s3" ? <S3Images /> : <>hello</>}
      </div>
    </div>
  );
};

export default Home;
