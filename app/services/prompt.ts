const mockValue = {
  ruolo: "Sviluppatore Full Stack",
  settore: "Tecnologia",
  esperienza: Math.floor(Math.random() * 8) + 1,
  localita: "Milano, Italia",
  livello: "Middle",
  titoloStudio: "Laurea in Informatica",
  competenze: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
  certificazioni: ["AWS Certified", "Google Cloud"],
  ralStimata: {
    min: 35000,
    max: 55000,
    media: 53000,
  },
  fileName: "",
  confidenceScore: Math.floor(Math.random() * 20) + 80,
};

export const PROMPT = (fileName: string) => `
Sei un esperto HR con esperienza in selezione automatizzata (ATS), analisi di CV e valutazione di candidati.

Riceverai il contenuto completo di un CV (anche non perfettamente formattato). Il tuo compito è:

---

🔹 **1. Estrarre informazioni chiave** dal CV:
- Ruolo professionale attuale
- Settore lavorativo
- Anni di esperienza complessivi
- Località (se presente)
- Livello stimato (junior, middle, senior, lead)
- Titolo di studio più alto
- Certificazioni rilevanti
- Competenze tecniche e linguistiche principali

---

🔹 **2. Stimare la RAL (retribuzione annua lorda)**
- Fornisci una stima realistica della RAL in euro, basata sul ruolo, esperienza e località.
- Inserisci anche una breve motivazione.

---

🔹 **3. Valutare la qualità del CV in sezioni** (da 0 a 10 punti per ciascuna):
Analizza e assegna un punteggio a ciascuna sezione seguente:

- **Formato e leggibilità (compatibilità ATS, struttura, uso del layout)**
- **Formazione (chiarezza, rilevanza dei titoli di studio)**
- **Esperienze lavorative (chiarezza, risultati, coerenza temporale)**
- **Competenze (hard/soft skills, completezza, attualità)**
- **Lingue e certificazioni (se presenti)**
- **Personalizzazione del CV e impatto generale**

Dopo aver valutato ogni sezione, calcola uno **score finale da 0 a 100**.

---

🔹 **4. Suggerisci eventuali miglioramenti**
Per ogni sezione con punteggio <7, suggerisci miglioramenti chiari e pratici.

---

📦 Restituisci tutto il risultato in JSON con la seguente struttura:

\`\`\`json
{
  "extracted_profile": {
    "current_role": "...",
    "industry": "...",
    "years_experience": "...",
    "location": "...",
    "level": "...",
    "education": "...",
    "certifications": ["..."],
    "skills": ["..."]
  },
  "fileName": "${fileName}",
  "estimated_salary_eur": {
    "min": "...",
    "max": "...",
    "average": "..."
  },
  "salary_estimation_reasoning": "...",
  "cv_evaluation": {
    "ats_format": 8,
    "education": 7,
    "work_experience": 9,
    "skills": 6,
    "languages_certifications": 5,
    "overall_impact": 7,
    "total_score": 71
  },
  "improvement_suggestions": {
    "ats_format": "...",
    "skills": "...",
    "languages_certifications": "..."
  }
}
\`\`\`
`;
