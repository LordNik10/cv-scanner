# 📄 CV Scanner

CV Scanner is a **personal web application** built with [Next.js](https://nextjs.org/) that allows users to **paste their CV** as plain text and receive:

- ✅ A detailed analysis with feedback and suggestions
- 📊 A section-based CV score (0–100)
- 💶 An estimated RAL (gross annual salary) based on the profile

The analysis is powered by **Gemini 2.0 Flash**, a lightweight and fast language model that performs smart extraction and evaluation of CV data.

---

## 🚀 Live Demo

**Hosted on Vercel** – try it live:  
➡️ [https://cv-scanner-lyart.vercel.app/](https://cv-scanner-lyart.vercel.app/)

---

## 🔍 How It Works

1. The user pastes the content of their CV (in **Italian or English**) into a text area
2. The app sends the input to the Gemini 2.0 Flash model
3. The AI:
   - Extracts key career info (role, skills, experience, location, education, etc.)
   - Estimates the RAL based on market data
   - Evaluates each section of the CV with a score
   - Returns a JSON with all results and personalized suggestions

> ✨ The app auto-detects the language and replies in the same language as the input.

---

## 🧠 Technologies Used

- **Next.js** – React framework for the frontend and API routes
- **TypeScript** – type-safe codebase
- **Gemini 2.0 Flash** – for intelligent CV analysis
- **Tailwind CSS** – utility-first styling
- **Vercel** – deployment and hosting

---

## 💡 Features

- Paste-only input (no file uploads needed)
- Clean and minimal UI
- Real-time response with loading state
- JSON structure results for easy parsing and future extension
- Accurate RAL estimation with market context
- Scoring system with improvement suggestions if needed

---

## 🔒 Privacy & Disclaimer

This is a **personal project**, developed for experimentation and learning purposes.

- 🧠 CV analysis is performed **in-memory only**, and no user data is stored or shared.
- 🧾 CV content is processed only to generate an AI-based response. No information is logged.
- 📊 RAL estimates and CV evaluations are **AI-generated** and should be considered **informative, not definitive**.
- 💼 This tool does **not replace a career consultant** or certified HR professional.

> ⚠️ Use CV Scanner as a **guideline** to improve your resume — not as an official assessment or salary negotiation tool.

---
