const { Schema, default: mongoose } = require("mongoose");

const investmentSchema = new Schema({
  id: String,
  income: Number,
  needs: Number,
  wants: Number,
  investment: Number,
  month: String,
  investmentStatus: String,
  investmentDate: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // ID of the user
    ref: "User", // Reference to the User model
    required: true,
  },
});

module.exports = investmentSchema;
