import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors({
  origin: "https://shaghayegh0.github.io", // Allow requests from your frontend
  methods: "GET, POST, OPTIONS", // Allowed methods
  allowedHeaders: "Content-Type, Authorization" // Allowed headers
}));

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
    res.send("AI Chatbot Server is Running!");
});


// AI Chatbot Endpoint
app.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });

    res.json({ response: completion.choices[0].message.content });

  } catch (error) {
    console.error("❌ OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

app.listen(PORT, () => {
  console.log(`AI Chatbot server running on http://localhost:${PORT}`);
});
