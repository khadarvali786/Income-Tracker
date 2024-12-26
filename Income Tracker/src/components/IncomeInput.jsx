import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import date from "date-and-time";
import "./IncomeInput.css";
import InvestmentPlan from "./InvestmentPlan";
import { useDispatch, useSelector } from "react-redux";
import {
  dataActions,
  fetchDataThunk,
  fetchUserInformationThunk,
  incomeActions,
} from "../Store";
import { addIncomeData } from "../Services/api";
import { useNavigate } from "react-router-dom";

const Modal = ({ onClose, onLogin, onSignup }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-contents">
        <i class="fa-solid fa-xmark close-button" onClick={onClose}></i>
        <h2 className="mt-4">Create an Account</h2>
        <p>To save your details, please create an account.</p>
        <button onClick={onLogin} className="login-button">
          Login
        </button>
        <button onClick={onSignup} className="signup-button">
          Signup
        </button>
      </div>
    </div>
  );
};

const IncomeInput = () => {
  const navigate = useNavigate();
  const income = useSelector((store) => store.income);
  const dispatch = useDispatch();
  const dataObj = useSelector((store) => store.data);
  const { user } = useSelector((store) => store.user);
  console.log(user);
  const data = dataObj.data;
  const selectedInvestment = dataObj.investment;
  const isEmpty = Object.keys(selectedInvestment).length === 0;
  const now = new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.status === true) {
      dispatch(fetchDataThunk());
    }
  }, []);
  const handleIncome = async () => {
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
    // var userLoggedIn = false; // Replace with actual login check
    if (user && user.status == true) {
      console.log("user data adding in the account");
      const sec1 = await addIncomeData(obj);
      dispatch(fetchDataThunk());
      console.log(sec1);
    } else {
      dispatch(dataActions.setData(obj));
    }
    dispatch(incomeActions.setIncome(0));
  };

  const handleInvesment = (investmentAmount) => {
    if (user && user.status == true) {
      dispatch(dataActions.setInvestment(investmentAmount));
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    console.log("Redirect to Login");
    navigate("/login");
    // Redirect or open login page
  };

  const handleSignup = () => {
    console.log("Redirect to Signup");
    // Redirect or open signup page
    navigate("/signup");
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
              onChange={(e) =>
                dispatch(incomeActions.setIncome(e.target.valueAsNumber || ""))
              }
              required
              placeholder="Enter Income"
            />
            <button
              type="submit"
              className="calulate-button"
              onClick={handleIncome}
            >
              Calculate
            </button>
          </div>
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

          {data.length > 0 && (
            <>
              <h2>Record Created</h2>
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
                      <td>{item.month}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {!isEmpty && <InvestmentPlan />}
        </div>
      </div>

      {/* Render modal when isModalOpen is true */}
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}
    </>
  );
};

export default IncomeInput;
