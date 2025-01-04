const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Mock data for analytics
const analyticsData = {
  totalSales: 1500,
  totalVolume: 20000, // In PXNM
  activeUsers: 320,
  topSellers: [
    { seller: "0x123", sales: 500 },
    { seller: "0x456", sales: 300 },
    { seller: "0x789", sales: 200 },
  ],
};

app.get("/analytics", (req, res) => {
  res.json(analyticsData);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Analytics server running on port ${PORT}`);
});
