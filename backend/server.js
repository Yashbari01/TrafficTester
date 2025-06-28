const express = require("express");
const cors = require("cors");
const axios = require("axios");
const pLimit = require("p-limit").default;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/test", async (req, res) => {
  const { url, method, payload, totalRequests, concurrency, authHeader } = req.body;

  const limit = pLimit(Number(concurrency));
  const results = [];

  const headers = {
    "Content-Type": "application/json",
  };

  if (authHeader) {
    headers["Authorization"] = authHeader;
  }

  const sendRequest = async (i) => {
    const start = Date.now();
    try {
      const response = await axios({
        method,
        url,
        data: method === "POST" || method === "PUT" ? payload : undefined,
        headers,
      });
      const timeTaken = Date.now() - start;
      // console.log('response: ', response);
      results.push({ i, status: response.status, timeTaken });
    } catch (err) {
      const timeTaken = Date.now() - start;
      results.push({
        i,
        status: err.response?.status || "ERROR",
        error: err.message,
        timeTaken,
      });
    }
  };

  const tasks = Array.from({ length: Number(totalRequests) }, (_, i) =>
    limit(() => sendRequest(i + 1))
  );

  await Promise.all(tasks);

  // 🔍 Compute summary
  const success = results.filter((r) => r.status === 200).length;
  const failed = results.length - success;
  const times = results.map((r) => r.timeTaken);
  const averageTime = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  res.json({
    summary: {
      totalRequests: Number(totalRequests),
      success,
      failed,
      averageTime,
      minTime,
      maxTime,
    },
    results,
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
