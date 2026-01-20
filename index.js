const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/addTask", async (req, res) => {
  try {
    const { date, time, task, category, voice } = req.body;
    const scriptUrl = "https://script.google.com/macros/s/AKfycbzvkJcClTz9VVm8l7U0Iw2pEmYg_ScUZ2Orudk7pDKb4K3bV_DBd_kJP_mZGClQHEqu/exec";

    const params = new URLSearchParams({ date, time, task, category, voice });
    const response = await axios.get(`${scriptUrl}?${params.toString()}`);

    return res.status(200).json({ status: "Success" });
  } catch (error) {
    return res.status(500).json({ status: "Failed", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy API running"));
