import React from "react";

const Base = ({ title = "", children }) => {
  return (
    <div className="base">
      <h2 className="title">{title}</h2>
      <div className="container">{children}</div>
    </div>
  );
};

export default Base;
