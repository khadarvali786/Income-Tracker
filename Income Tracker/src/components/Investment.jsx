import React from "react";

const Investment = () => {
  return (
    <div>
      <h1>Investment Tracker</h1>
      <h2>Investment Amount : </h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Investment ID</th>
            <th>Investment Name</th>
            <th>Investment Amount</th>
            <th>Investment Date</th>
            <th>Investment Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Investment 1</td>
            <td>1000</td>
            <td>2020-01-01</td>
            <td>
                Invested
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Investment;
