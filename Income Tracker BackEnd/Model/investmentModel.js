const {model} = require('mongoose');
const investmentSchema = require("../Schema/InvestmentSchema");

const investmentModel = new model("Investement",investmentSchema);

module.exports = investmentModel;