export interface AnalyzedFile {
  extracted_profile: ExtractedProfile;
  estimated_salary_eur: EstimatedSalaryEur;
  salary_estimation_reasoning: string;
  fileName: string;
  cv_evaluation: CvEvaluation;
  improvement_suggestions: ImprovementSuggestions;
}

export interface ExtractedProfile {
  current_role: string;
  industry: string;
  years_experience: number;
  location: string;
  level: string;
  education: string;
  certifications: string[];
  skills: string[];
}

export interface EstimatedSalaryEur {
  min: number;
  max: number;
  average: number;
}

export interface CvEvaluation {
  ats_format: number;
  education: number;
  work_experience: number;
  skills: number;
  languages_certifications: number;
  overall_impact: number;
  total_score: number;
}

export interface ImprovementSuggestions {
  ats_format: string;
  skills: string;
  languages_certifications: string;
}
