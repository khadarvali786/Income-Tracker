import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import date from "date-and-time";
import "./IncomeInput.css";
import InvestmentPlan from "./InvestmentPlan";
import { useDispatch, useSelector } from "react-redux";
import {
  dataActions,
  fetchDataThunk,
  incomeActions,
  expenseActions,
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

const InvestmentPlanModal = ({ onClose, investment, handelAllIncome }) => {
  const expenses = useSelector((store) => store.expenses);
  const dispatch = useDispatch();
  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center">
      <div className="modal-contents p-4 bg-white rounded shadow mt-5">
        <i
          className="fa-solid fa-xmark close-button position-absolute top-0 end-0 m-3"
          onClick={onClose}
        ></i>
        <div className="p-1">
          <div className="form-container">
            <label htmlFor="income" className="form-label">
              Do you have any ongoing Loans/CardBills/Policies
            </label>
            <div className="mb-3">
              <label htmlFor="income" className="form-label">
                Loans
              </label>
              <input
                className="form-control border border-primary"
                type="number"
                id="emis"
                name="emis"
                required
                placeholder="Enter EMI/Loan Amount"
                value={expenses.loans}
                onChange={(e) =>
                  dispatch(
                    expenseActions.setLoans(e.target.valueAsNumber || "")
                  )
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="income" className="form-label">
                Card Bills
              </label>
              <input
                className="form-control border border-primary"
                type="number"
                id="cardBills"
                name="cardBills"
                placeholder="Enter Credit Card Bill Amount"
                value={expenses.cardBills}
                onChange={(e) =>
                  dispatch(
                    expenseActions.setCardBills(e.target.valueAsNumber || "")
                  )
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="income" className="form-label">
                Policies
              </label>
              <input
                className="form-control border border-primary"
                type="number"
                id="policies"
                name="policies"
                placeholder="Enter Policies Amount"
                value={expenses.policies}
                onChange={(e) =>
                  dispatch(
                    expenseActions.setPolicies(e.target.valueAsNumber || "")
                  )
                }
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={() => handelAllIncome(expenses)}
            >
              Submit
            </button>
          </div>
        </div>
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
  const data = dataObj.data;
  const selectedInvestment = dataObj.investment;
  const isEmpty = Object.keys(selectedInvestment).length === 0;
  const now = new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investmentPlanModalOpen, setInvestmentPlanModalOpen] = useState(false);
  const [error ,setErrorMessage] = useState("");

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
    // var obj = {
    //   id: uniqid(),
    //   income: income,
    //   needs: income * 0.5,
    //   wants: income * 0.3,
    //   investment: income * 0.2,
    //   month: date.format(now, "MMMM DD YYYY"),
    //   investmentStatus: "",
    // };
    // // var userLoggedIn = false; // Replace with actual login check
    // if (user && user.status == true) {
    //   const sec1 = await addIncomeData(obj);
    //   dispatch(fetchDataThunk());
    // } else {
    //   dispatch(dataActions.setData(obj));
    // }
    // dispatch(incomeActions.setIncome(""));
    setInvestmentPlanModalOpen(true);
  };

  const handelAllIncome = async (expenses) => {

    let totalIncome =
      income - expenses.loans - expenses.cardBills - expenses.policies;
    var obj = {
      id: uniqid(),
      income: totalIncome,
      needs: income * 0.5,
      wants: income * 0.3,
      investment: income * 0.2,
      month: date.format(now, "MMMM DD YYYY"),
      investmentStatus: "",
    };
    // var userLoggedIn = false; // Replace with actual login check
    if (user && user.status == true) {
      const sec1 = await addIncomeData(obj);
      dispatch(fetchDataThunk());
    } else {
      dispatch(dataActions.setData(obj));
    }
    dispatch(incomeActions.setIncome(""));
    dispatch(expenseActions.setLoans(""));
    dispatch(expenseActions.setCardBills(""));
    dispatch(expenseActions.setPolicies(""));
    setInvestmentPlanModalOpen(false);
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
    navigate("/login");
    // Redirect or open login page
  };

  const handleSignup = () => {
    // Redirect or open signup page
    navigate("/signup");
  };

  return (
    <>
      <div className="table-wrapper">
        <div className="container">
          <h1>Income Allocation</h1>
          <div className="form-container mb-4 max-width-800">
            <label htmlFor="income">Enter Income Amount</label>
            <input
              type="number"
              id="income"
              name="income"
              value={income}
              onChange={(e) =>{
                var income = e.target.valueAsNumber || "";
                if(income < 0 || income > 100000000){
                  setErrorMessage("Income amount cannot exceed 9 digits");
                }else{
                  setErrorMessage("");
                dispatch(incomeActions.setIncome(e.target.valueAsNumber || ""))
                }
              }}
              required
              placeholder="Enter Income"
              min={5}
              max={100000000}
            />
            {error && <p className="text-danger">{error}</p>}
            <h3 className="income-display">Your income is: {income}</h3>
            <table className="table">
            <thead>
              <tr>
                <th>Needs (50%)</th>
                <th>Wants (30%)</th>
                <th>Savings (20%)</th>
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
            <button
              type="submit"
              className="calulate-button"
              onClick={handleIncome}
            >
              Calculate
            </button>
          </div>
          
  
          {data.length > 0 && (
            <>
              <h2>Record Created</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Enter Income</th>
                    <th>Needs</th>
                    <th>Wants</th>
                    <th>Savings</th>
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
      {investmentPlanModalOpen && (
        <InvestmentPlanModal
          onClose={() => setInvestmentPlanModalOpen(false)}
          handelAllIncome={handelAllIncome}
        />
      )}
    </>
  );
};

export default IncomeInput;
