import React from "react";
import "../../styles/inner-loader.css";

interface Props {
  height?: number | string;
}

const Loader: React.SFC<Props> = ({ height }) => {
  return (
    <div
      style={{
        height,
      }}
      className="inner-loader"
    >
      <div className="ball-beat">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
