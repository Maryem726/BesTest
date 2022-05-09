const mongoose = require("mongoose");

const Complaint = new mongoose.Schema(
    {
        topic: { type: String, required: true },
        description: { type: String, required: false },
        status: { type: String, default: "Open" },
        image: { type: String, required: false },
        email: { type: String, required: false },
        userId: { type: String, required: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Complaint", Complaint);