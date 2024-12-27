import React, { useEffect } from "react";
import IncomeInput from "./components/IncomeInput";
import Navbar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInformationThunk } from "./Store";
import Loader from "./components/Loader";

const App = () => {
  const dispatch = useDispatch();
  const fetchStatus = useSelector((store) => store.fetchStatus);

  useEffect(() => {
    if (fetchStatus.fetchDone) return;
    dispatch(fetchUserInformationThunk());
  }, [fetchStatus]);

  return (
    <div>
      {fetchStatus.currentFetchStatus ? (
        <Loader />
      ) : (
        <>
          {" "}
          <div>
            <Navbar />
          </div>
          <Outlet />
        </>
      )}
    </div>
  );
};

export default App;
