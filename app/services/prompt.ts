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

export const PROMPT = (
  fileName: string
) => `for every input return this object ${JSON.stringify(
  { ...mockValue, fileName },
  null,
  2
)}
`;
