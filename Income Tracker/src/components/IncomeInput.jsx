import React, { useState } from "react";
import uniqid from "uniqid";
import date from "date-and-time";
import "./IncomeInput.css"; 
import Investment from "./Investment";
import InvestmentPlan from "./InvestmentPlan";
import { useDispatch, useSelector } from "react-redux";
import { incomeActions } from "../Store";

const IncomeInput = () => {
  const income = useSelector((store)=>store.income);
  const dispatch = useDispatch()

  const [data, setData] = useState(k);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
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
    };
    setData((prevdata) => [obj, ...prevdata]);
    dispatch(incomeActions.setIncome(0))
  };
  const handleInvesment = (investmentAmount) => {
    setSelectedInvestment(investmentAmount);
  }

  return (
    <>
    <div className="container">
    <h1>Income Allocation</h1>
    <div className="form-container">
      <label htmlFor="income">Enter Income Amount</label>
      <input
        type="number"
        id="income"
        name="income"
        value={income}
        onChange={(e) => dispatch(incomeActions.setIncome(e.target.valueAsNumber || ""))}
        required
      />
      <button type="submit" onClick={handleIncome}>
        Calculate
      </button>
    </div>
    {<><h3 className="income-display">Your income is: {income}</h3>
    <table className="table" >
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
            <td className="InvestmentAmount" onClick={()=>handleInvesment(item.investment)} >{item.investment}</td>
            <td>{item.month}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {selectedInvestment && <InvestmentPlan amount={selectedInvestment}/>}
  </div>
 
  </>
  );
};

export default IncomeInput;

