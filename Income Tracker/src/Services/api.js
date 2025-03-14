import axios from "axios";
import { userActions } from "../Store";
import { useDispatch } from "react-redux";

const api = axios.create({
  //Server URL
  baseURL: "https://income-tracker-server.onrender.com", 
  //localBackURL
  //baseURL: "http://localhost:3001",
  
});

// Fetch data from the database
export const fetchDataFromDb = async () => {
  try {
    // const response = await api.get(`/getUserData?userId=${userId}`);
    //const response = await api.get("/data");
    const response = await api.get("/getUserData", {
      withCredentials: true,
    });
    console.log("response", response);

    return response.data; // Return fetched data
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Add investment data to the database
export const addIncomeData = async (investmentData) => {
  try {
    const response = await api.post("/insertData", investmentData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding Income data:", error);
    throw error;
  }
};

// Update investment status in the database
export const updateInvestmentStatus = async (status) => {
  try {
    const response = await api.put("/updateData", status);
    return response.data;
  } catch (error) {
    console.error("Error updating investment status:", error);
    throw error;
  }
};

//Fetch user information
export const fetchUserInfo = async () => {
  try {
    const response = await api.post("/", {}, { withCredentials: true });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw error;
  }
};

//logout user information

export const logoutUser = async () => {
  try {
    const response = await api.get("/logout", {
      withCredentials: true, // Include credentials (cookies)
    });
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

// Other API calls can also be defined here
