import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./InvestmentTracker.css";
import { fetchDataThunk } from "../Store";

const Investment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDataThunk()); // Fetch data on component mount
  }, [dispatch]);
  const { data } = useSelector((store) => store.data);
   //check data.investmentStatus is empty and filter
   const investments = data.filter(item => item.investmentStatus != "");
  //  console.log("investmentdate added"+ JSON.stringify(investments));
  // if(data.length > 0) {
  //   return <h1>Data is there</h1>
  // }
 
  if (investments.length === 0)
    return <h1 className="investment-tracker__no-data">No investments found</h1>;
  const totalAmount = investments.reduce(
    (sum, investment) => sum + investment.investment,
    0
  );
  return (
    <div className="investment-tracker">
      <h1 className="investment-tracker__title">Investment Tracker</h1>
      <h2 className="investment-tracker__total">
        Total Investment Amount: ₹{totalAmount}
      </h2>

      <div className="investment-tracker__table-wrapper">
        <table className="investment-tracker__table">
          <thead>
            <tr>
              <th>Investment ID</th>
              <th>Investment Amount</th>
              <th>Investment Date</th>
              <th>Investment Status</th>
            </tr>
          </thead>
          <tbody>
            {investments.map(
              ({
                id,
                investment,
                investmentDate,
                investmentStatus,
              }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>₹{investment.toFixed(2)}</td>
                  <td>{investmentDate}</td>
                  <td>{investmentStatus}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Investment;
