import React from "react";
import "./InvestmentPlan.css";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../Store";
import { useNavigate } from "react-router-dom";
const InvestmentPlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Extract required data from Redux state
  const { investment, data } = useSelector((store) => store.data);
  const { id, investment: amount } = investment;
  const selectedInvestment = data.find((item) => item.id === id);
  const investmentStatus = selectedInvestment?.investmentStatus || "";

  // Reusable function to handle investment actions
  const handleInvestment = (status) => {
    const updatedStatus = { id, investmentStatus: status };
    const newInvestment = {
      id,
      investmentAmount: amount,
      investmentStatus: status,
    };

    dispatch(dataActions.updateInvestmentStatus(updatedStatus));
    dispatch(dataActions.setInvestments(newInvestment));
    navigate("/investments");
  };

  return (
    <>
      <div className="investment-plan">
        <h1>Investment Plan</h1>
        <h2 className="investment-amount">Investment Amount: ₹{amount}</h2>
        <div class="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Investment Amount</th>
                <th>Equity Mutual Funds (70%)</th>
                <th>Gold (10%)</th>
                <th>Crypto (20%)</th>
                <th>Invested</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>₹{amount}</td>
                <td>₹{(amount * 0.7).toFixed(2)}</td>
                <td>₹{(amount * 0.1).toFixed(2)}</td>
                <td>₹{(amount * 0.2).toFixed(2)}</td>
                <td>
                  {investmentStatus === "" ? (
                    <>
                      <span
                        className="btn yes"
                        onClick={() => handleInvestment("Invested")}
                      >
                        Yes
                      </span>
                      <span
                        className="btn no"
                        onClick={() => handleInvestment("Not Invested")}
                      >
                        No
                      </span>
                    </>
                  ) : (
                    <span>{investmentStatus}</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default InvestmentPlan;
