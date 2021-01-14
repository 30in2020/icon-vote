import React from "react";
import "../../styles/loader.css";

interface Props {
  height: number | string;
}

const Loader: React.SFC<Props> = ({ height }) => {
  return (
    <div
      style={{
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
      }}
    >
      <div className="loader">Loading...</div>
    </div>
  );
};

export default Loader;
