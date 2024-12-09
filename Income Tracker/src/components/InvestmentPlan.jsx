import React from "react";

const InvestmentPlan = ({amount}) => {
  return (
    <div>
      <h1>Investment Plan</h1>
      <h2>Investment Amount : {amount}</h2>
      <table class="table ">
        <thead>
          <tr>
            <th scope="col">Investment Amount</th>
            <th scope="col">Equity Mutal Funds (70%)</th>
            <th scope="col">Gold (10%)</th>
            <th scope="col">crypto (20%) </th>
            <th scope="col">Invested</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{amount}</td>
            <td>{amount*0.7}</td>
            <td>{amount*0.1}</td>
            <td>{amount*0.2}</td>
            <td>
              <span>yes</span> &nbsp;&nbsp;
              <span>No</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentPlan;
