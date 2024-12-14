import React, { useState } from "react";
import uniqid from "uniqid";
import date from "date-and-time";
import "./IncomeInput.css";
import Investment from "./Investment";
import InvestmentPlan from "./InvestmentPlan";
import { useDispatch, useSelector } from "react-redux";
import { dataActions, incomeActions } from "../Store";
import { use } from "react";

const IncomeInput = () => {
  const income = useSelector((store) => store.income);
  const dispatch = useDispatch();
  const dataObj = useSelector((store) => store.data);
  const data = dataObj.data;
  //const [data, setData] = useState([]);
  const selectedInvestment = dataObj.investment;
  //check object is empty or not
  const isEmpty = Object.keys(selectedInvestment).length === 0;
  //const [selectedInvestment, setSelectedInvestment] = useState(null);
  const now = new Date();
  const handleIncome = () => {
    if (!income || income <= 0) {
      alert("Please enter a valid income amount");
      return;
    }
    var obj = {
      id: uniqid(),
      income: income,
      needs: income * 0.5,
      wants: income * 0.3,
      investment: income * 0.2,
      month: date.format(now, "MMMM DD YYYY"),
      investmentStatus: "",
    };
    dispatch(dataActions.setData(obj));
    //setData((prevdata) => [obj, ...prevdata]);
    dispatch(incomeActions.setIncome(0));
  };
  const handleInvesment = (investmentAmount) => {
    dispatch(dataActions.setInvestment(investmentAmount));
  };
  return (
    <>
      <div className="table-wrapper">
        <div className="container">
          <h1>Income Allocation</h1>
          <div className="form-container">
            <label htmlFor="income">Enter Income Amount</label>
            <input
              type="number"
              id="income"
              name="income"
              value={income}
              //Use separate fucntion for onChange value function to get the
              onChange={(e) =>
                dispatch(incomeActions.setIncome(e.target.valueAsNumber || ""))
              }
              required
            />
            <button type="submit" onClick={handleIncome}>
              Calculate
            </button>
          </div>
          {
            <>
              <h3 className="income-display">Your income is: {income}</h3>

              <table className="table">
                <thead>
                  <tr>
                    <th>Needs (50%)</th>
                    <th>Wants (30%)</th>
                    <th>Investment (20%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{Math.round(income * 0.5).toFixed(0)}</td>
                    <td>{Math.round(income * 0.3).toFixed(0)}</td>
                    <td>{Math.round(income * 0.2).toFixed(0)}</td>
                  </tr>
                </tbody>
              </table>
            </>
          }

          <h2>Reord Created</h2>

          <table className="table">
            <thead>
              <tr>
                <th>Enter Income</th>
                <th>Needs</th>
                <th>Wants</th>
                <th>Investment</th>
                <th>Month</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.income}</td>
                  <td>{item.needs}</td>
                  <td>{item.wants}</td>
                  <td
                    className="InvestmentAmount"
                    onClick={() => handleInvesment(item)}
                  >
                    {item.investment}
                  </td>
                  <td onClick={() => handleobj(item)}>{item.month}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {!isEmpty && <InvestmentPlan />}
        </div>
      </div>
    </>
  );
};

export default IncomeInput;
