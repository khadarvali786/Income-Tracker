import React from "react";
import "../App.css";
const Loader = () => {
  return (
    <div className="loading-overlay">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
