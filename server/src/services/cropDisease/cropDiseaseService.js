const fs = require("fs");
const { GoogleGenAI } = require("@google/genai");
const { getCropDiseasePrompt } = require("./cropDiseasePrompt");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function getFallbackDiseaseResult() {
  return {
    disease: "Leaf Spot / Fungal Infection Possible",
    confidence: "medium",
    symptoms: [
      "Spots visible on leaf surface",
      "Possible yellowing or drying near infected area",
    ],
    solution: [
      "Remove badly infected leaves",
      "Avoid overwatering and waterlogging",
      "Use recommended fungicide after local expert confirmation",
    ],
    warning: "This is a demo result. Confirm with an agriculture expert before spraying.",
    source: "fallback",
  };
}

async function analyzeCropDisease(file) {
  if (!file) {
    return {
      disease: "No image uploaded",
      confidence: "low",
      symptoms: ["Image not found"],
      solution: ["Please upload a clear crop or leaf image"],
      warning: "Upload a clear image for better guidance.",
      source: "validation",
    };
  }

  try {
    const imageBuffer = fs.readFileSync(file.path);
    const base64Image = imageBuffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          inlineData: {
            mimeType: file.mimetype,
            data: base64Image,
          },
        },
        {
          text: getCropDiseasePrompt(),
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text);

    return {
      ...parsed,
      source: "gemini",
    };
  } catch (error) {
    console.error("Crop disease AI error:", error.message);
    return getFallbackDiseaseResult();
  }
}

module.exports = { analyzeCropDisease };