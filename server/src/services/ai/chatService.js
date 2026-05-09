const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function getChatReply(message) {
 const prompt = `
You are Farmer Super App AI, an expert agriculture assistant for Indian farmers.

STRICT RULES:
- Answer in SHORT and POINT-WISE format.
- Use bullet points (• or -) wherever possible.
- Do NOT write long paragraphs.
- Keep answers easy to understand for farmers.
- Start directly with the answer (NO greeting).
- Maximum 5–6 points unless necessary.
- Use practical and real farming advice only.
- Avoid technical jargon.
- If needed, give steps.

LANGUAGE RULE:
- Reply in the same language as the user (Hindi / English / mixed).

EXAMPLE STYLE:
- Ideal temperature: 20–25°C  
- Water: Moderate irrigation  
- Soil: Well-drained loamy soil  

User question: ${message}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return {
      reply:
        response.text || "No response from AI.",
    };
  } catch (error) {
    console.error("Gemini error:", error.message);

    return {
      reply: "AI service is unavailable right now. Please try again.",
    };
  }
}

module.exports = { getChatReply };