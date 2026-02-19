const { OpenAI } = require("openai");

// 1. We still use the OpenAI SDK, but we point it to Groq's free servers!
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1", // This is the magic redirect line
});

const generateClinicalExplanation = async (riskProfile, drugName) => {
  if (
    riskProfile.risk_level === "Safe" ||
    riskProfile.risk_level === "Unknown"
  ) {
    return "No significant pharmacogenomic interactions detected for this specific drug based on the provided genetic profile.";
  }

  const prompt = `
    You are an expert clinical pharmacogeneticist. 
    A patient is prescribed ${drugName}. 
    Their genetic profile shows they have the ${riskProfile.matched_variant.variant} variant on the ${riskProfile.primary_gene} gene (rsID: ${riskProfile.matched_variant.rsid}), making them a ${riskProfile.phenotype}.
    The clinical risk level is classified as: ${riskProfile.risk_level}.
    
    In 2 to 3 concise sentences, explain the biological mechanism behind this risk. 
    You must explicitly cite the gene and variant. Do not provide disclaimers. Speak directly to the clinician.
    `;

  try {
    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile", // Updated for 2026 standards
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 150,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("LLM Error:", error);
    return "Explanation unavailable at this time due to AI service timeout.";
  }
};

module.exports = { generateClinicalExplanation };
