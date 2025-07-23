export interface AnalyzedFile {
  role: string;
  industry: string;
  experience: number;
  location: string;
  level: string;
  education: string;
  skills: string[];
  certifications: string[];
  estimatedRal: {
    min: number;
    max: number;
    average: number;
  };
  fileName: string;
  confidenceScore: number;
  cvScore: {
    overall: number;
    sections: {
      personalInfo: number;
      experience: number;
      skills: number;
      education: number;
      certifications: number;
      formatting: number;
    };
  };
  aiSuggestions: {
    priority: "high" | "medium" | "low";
    category: string;
    title: string;
    description: string;
    impact: string;
  }[];
}
