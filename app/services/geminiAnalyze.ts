import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPT } from "./prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function geminiAnalyze(file: string, fileName: string) {
  //   const mocked = `
  // {
  //   "role": "Frontend Developer",
  //   "industry": "E-commerce",
  //   "experience": 3,
  //   "location": "Rome, Italy",
  //   "level": "Junior",
  //   "education": "Master's Degree in Web Engineering",
  //   "skills": ["HTML", "CSS", "JavaScript", "Vue.js"],
  //   "certifications": ["Scrum Master", "Google UX Design"],
  //   "estimatedRal": {
  //     "min": 25000,
  //     "max": 35000,
  //     "average": 30000
  //   },
  //   "fileName": "${fileName}",
  //   "confidenceScore": 82,
  //   "cvScore": {
  //     "overall": 65,
  //     "sections": {
  //       "personalInfo": 6,
  //       "experience": 7,
  //       "skills": 6,
  //       "education": 7,
  //       "certifications": 5,
  //       "formatting": 8
  //     }
  //   },
  //   "aiSuggestions": [
  //     {
  //       "priority": "high",
  //       "category": "Skills",
  //       "title": "Add project examples",
  //       "description": "Include specific projects where you applied Vue.js and JavaScript.",
  //       "impact": "Increases credibility and shows practical application of skills."
  //     }
  //   ]
  // }
  // `;

  try {
    const result = await model.generateContent([
      { text: PROMPT(fileName) },
      { text: file },
    ]);

    return result.response.text().trim();

    // return mocked;
  } catch (error) {
    console.error("Error during analysis:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
