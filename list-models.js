require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY);
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        console.log("AVAILABLE MODELS:");
        data.models.forEach(m => console.log(m.name, " - ", m.supportedGenerationMethods.join(", ")));
    } catch (e) {
        console.error(e);
    }
}

listModels();
