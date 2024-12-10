export interface Quiz {
  question: string;
  options: {
    answer: string;
    isCorrect: boolean;
  }[];
}

export enum DIFFICULTY {
  EASY = 1,
  HARD = 2,
}
export type DistrictId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface District {
  id: DistrictId;
  name: string;
  description: string;
  income: number;
  difficulty: DIFFICULTY;
  image: string;
  position: {
    top: number;
    left: number;
    zIndex?: number;
  };
}

export interface QuizParams {
  isCapture?: boolean;
  capture?: {
    difficulty: DIFFICULTY;
    districtId: DistrictId;
  };
  isDaily?: boolean;
  isInvestment?: boolean;
}

export interface QuizData {
  districtId: DistrictId;
  name: string;
  difficulty: DIFFICULTY;
  questions: Question[];
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}

export interface Option {
  answer: string;
  isCorrect: boolean;
}

export enum ActiveItem {
  TIP,
  SKIP,
}

export interface Reference {
  id: number;
  name: string;
  description: string;
  image: string; // just empty field
}
export interface IStudy {
  id: number;
  name: string;
  descriptionShort: string;
  descriptionLong: string;
  image: string; // just empty field
}
