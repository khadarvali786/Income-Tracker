import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./InvestmentTracker.css";

const Investment = () => {
  const { investments } = useSelector((store) => store.data);
  const totalAmount = investments.reduce(
    (sum, investment) => sum + investment.investmentAmount,
    0
  );
  if (investments.length === 0)
    return <p className="investment-tracker__no-data">No investments found</p>;
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
                investmentId,
                investmentAmount,
                investmentDate,
                investmentStatus,
              }) => (
                <tr key={investmentId}>
                  <td>{investmentId}</td>
                  <td>₹{investmentAmount.toFixed(2)}</td>
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
