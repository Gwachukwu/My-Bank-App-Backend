const express = require("express");
const router = express.Router();
const Item = require("../model/accesssTransactionModel");
const auth = require("../middleware/auth");

// create new collection called, this transaction with display for testing
router.post("/access", auth, async (req, res) => {
  try {
    const { date, amount, type, description } = req.body;
    const item = new Item({
      date,
      amount,
      type,
      description,
    });
    await item.save();
    return res.send("Transaction successful");
  } catch (err) {
    return res.json("Please fill all fields");
  }
});

router.get("/access", auth, async function (req, res) {
  try {
    const items = await Item.find();
    return res.send(items);
  } catch (err) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
});

module.exports = router;
