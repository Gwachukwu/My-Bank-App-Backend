const express = require("express");
const router = express.Router();
const Transaction = require("../model/transactModel");
const auth = require("../middleware/auth");

router.post("/",auth, async (req, res) => {
  try {
    const { date, amount, type, description } = req.body;
    const transaction = new Transaction({
      date,
      amount,
      type,
      description,
    });
    await transaction.save();
    return res.send("Transaction successful");
  } catch (err) {
    return res.json("Please fill all fields");
  }
});

router.get("/",auth, async function (req, res) {
  try {
    const transactions = await Transaction.find();
    return res.send(transactions);
  } catch (err) {
    return res.status(401).json({ msg: "Unthorized" });
  }
});

module.exports = router;
