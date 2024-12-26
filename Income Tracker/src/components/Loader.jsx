import React from "react";
import "../App.css";
const Loader = () => {
  return (
    <div className="spinnerLoader">
      <center>
        <div class="outer-spinner spinner-border text-primary" role="status">
          <div
            class="medium-spinner spinner-border text-secondary"
            role="status"
          >
            <div
              class="small-spinner spinner-border text-success"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Loader;
