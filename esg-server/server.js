const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 4000;

// Method: GET
// Route: /api/funds?ids=1,2,3,4
// Description: Fetches fund data for given IDs with a simulated delay
app.get("/api/funds", async (req, res) => {
  const ids = req.query.ids?.split(",") || [];

  console.log(`➡️ Fetching funds: [${ids.join(", ")}]`);

  // ⏱ Simulate **random delay** between 300ms to 2500ms
  const delayTime = Math.floor(Math.random() * 2000) + 300;

  // Simulate a delay to mimic real-world API response time
  await new Promise((resolve) => setTimeout(resolve, delayTime));

  // Generate mock data for each ID
  const data = ids.map((id) => ({
    id,
    name: `Fund ${id}`,
    score: Math.floor(Math.random() * 100),
    delay: delayTime,
  }));

  console.log(`✅ Responding funds [${ids.join(", ")}] in ${delayTime}ms`);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
