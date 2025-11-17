const { VertexAI } = require("@google-cloud/vertexai");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

// Create Vertex client
const vertex = new VertexAI({
  project: process.env.PROJECT_ID,
  location: process.env.LOCATION || "us-central1",
});

// Load the model
const model = vertex.getGenerativeModel({
  model: "models/gemini-2.5-flash-lite"
});

// ----------------------------------------------------------------------
// Generate Interview Q&A
// ----------------------------------------------------------------------
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const result = await model.generateContent(prompt);

    const rawText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error("Vertex raw response:", result);
      return res.status(500).json({
        message: "AI returned empty or malformed response",
      });
    }

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    console.error("🔥 VertexAI ERROR (generateInterviewQuestions):", error);
    res.status(500).json({
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};

// ----------------------------------------------------------------------
// Generate Concept Explanation
// ----------------------------------------------------------------------
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = conceptExplainPrompt(question);

    const result = await model.generateContent(prompt);

    const rawText =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      console.error("Vertex raw response:", result);
      return res.status(500).json({
        message: "AI returned empty or malformed response",
      });
    }

    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    console.error("🔥 VertexAI ERROR (generateConceptExplanation):", error);
    res.status(500).json({
      message: "Failed to generate concept explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
