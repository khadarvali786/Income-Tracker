require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const app = express();

//DB Imports
const investmentModel = require("./Model/investmentModel");
const { authenticate } = require("./Middlewares/AuthMiddleware");

const port = process.env.PORT || 3001;

const MONGODB = process.env.MONGO_URL;
app.use(
  cors({
    origin: ["http://localhost:5173"], // allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
const data = [
  {
    id: "13",
    income: 2312,
    needs: 12312,
    wants: 12312,
    investment: 12312,
    month: "12-12-2001",
    investmentStatus: "Not Invested",
  },
  {
    id: "14",
    income: 12312,
    needs: 12312,
    wants: 12312,
    investment: 12312,
    month: "12-12-2001",
    investmentStatus: "Not Invested",
  },
];

app.use("/", authRoute);

app.get("/insertData", async (req, res) => {
  //Insert data into the MonoDB database
  try {
    await investmentModel.insertMany(data);
    res.send("Data inserted successfully");
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Error inserting data");
  }
});

app.post("/adddummydata", authenticate, async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user._id;
    const newData = await investmentModel(data);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

app.post("/insertData", authenticate, async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user._id;
    console.log("insertData", data);
    //check if data object is empty or not
    if (Object.keys(data).length === 0) {
      return res.status(400).send("No data provided");
    }
    const newInvestment = new investmentModel(data);
    await newInvestment.save();
    res.send("Data inserted successfully");
    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Error inserting data");
  }
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getUserData", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;

    const userData = await investmentModel.find({ userId: userId });
    // if (!userData) {
    //   return res.status(404).send("User data not found");
    // }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});
app.get("/data", async (req, res) => {
  try {
    const data = await investmentModel.find({});
    res.send(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/deleteData", async (req, res) => {
  try {
    await investmentModel.deleteMany({});
    res.send("Data deleted successfully");
    console.log("Data deleted successfully");
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Error deleting data");
  }
});

//update the data in the database
app.put("/updateData", async (req, res) => {
  try {
    const data = req.body;
    //check if data object is empty or not
    if (Object.keys(data).length === 0) {
      return res.status(400).send("No data provided");
    }
    const { id } = data;
    const updatedInvestment = await investmentModel.updateOne(
      { id }, // Find document by id
      data
    );
    if (!updatedInvestment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    res.status(200).json({
      message: "Investment updated successfully",
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send(error.message);
  }
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  //localhost is the default port
  console.log(`Server is running on port http://localhost:${port}`);
});
