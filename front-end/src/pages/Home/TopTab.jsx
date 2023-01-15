import React from "react";
import "./toptab.css";
const TopTab = ({ tab, settab }) => {
  return (
    <div className="tab">
      <div
        onClick={() => {
          settab("s3");
        }}
        className={`single-tab ${tab == "s3" && "selected-tab"}`}
      >
        S3
      </div>
      <div
        onClick={() => {
          settab("drive");
        }}
        className={`single-tab ${tab == "drive" && "selected-tab"}`}
      >
        Google Drive
      </div>
    </div>
  );
};

export default TopTab;
