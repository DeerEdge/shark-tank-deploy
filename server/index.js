import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8787;
const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

app.use(express.json({ limit: "1mb" }));

app.post("/api/gemini", async (req, res) => {
  if (!apiKey) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY in server env." });
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing prompt." });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "Gemini API error.",
      });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return res.json({ text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unexpected server error." });
  }
});

app.listen(port, () => {
  console.log(`Gemini proxy running on http://localhost:${port}`);
});
