const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// আপনার নতুন Apps Script URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwyUYTwvOdleFM_RBvn17cH6lT5xoe_OkeZB9cpW6c8LtbVpRIn_PmYB7WbN8ZhS7Qolg/exec";

// 1. ADD TASK (মিটিং বা কাজ যুক্ত করা)
app.post("/addTask", async (req, res) => {
    try {
        const payload = { ...req.body, action: "add" }; // action ট্যাগ যুক্ত করা হলো
        console.log("Adding Task:", payload);

        const response = await axios.post(SCRIPT_URL, payload, {
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            maxRedirects: 5
        });

        if (response.data.status === "Success") {
            return res.status(200).json(response.data);
        } else {
            throw new Error(response.data.message || "Unknown Sheet Error");
        }
    } catch (error) {
        console.error("Add Task Failed:", error.message);
        return res.status(500).json({ 
            status: "Failed", 
            message: "স্যার, গুগল শিটে কানেক্ট করতে পারছি না। দয়া করে হৃদয় স্যারকে জানান।",
            error: error.message 
        });
    }
});

// 2. READ TASKS (আজকের বা কালকের কাজ দেখা)
app.post("/readTasks", async (req, res) => {
    try {
        const payload = { ...req.body, action: "read" };
        console.log("Reading Tasks:", payload);

        const response = await axios.post(SCRIPT_URL, payload, {
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            maxRedirects: 5
        });

        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ status: "Failed", error: error.message });
    }
});

// 3. UPDATE TASK (কাজ 'Done' বা 'Reschedule' করা)
app.post("/updateTask", async (req, res) => {
    try {
        const payload = { ...req.body, action: "update" };
        console.log("Updating Task:", payload);

        const response = await axios.post(SCRIPT_URL, payload, {
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            maxRedirects: 5
        });

        if (response.data.status === "Success") {
            return res.status(200).json(response.data);
        } else {
            throw new Error("Update Failed");
        }
    } catch (error) {
        return res.status(500).json({ status: "Failed", error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("MD Proxy API is running..."));
