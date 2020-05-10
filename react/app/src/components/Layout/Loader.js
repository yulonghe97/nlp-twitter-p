import React from "react";
import LoaderSVG from "../../img/loader.svg";

const style = {
  height: "100px",
};

export default function Loader() {
  return (
    <>
      <div className="d-flex justify-content-center">
        <img src={LoaderSVG} alt="loader" style={style} />
      </div>
      <div className="d-flex justify-content-center">
        Analyzing...
      </div>
    </>
  );
}
