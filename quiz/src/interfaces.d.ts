interface LoginUserProps {
    username?: string;
    password?: string;
  }
interface SuccessLogin {
    success: boolean;
    message?: string;
    token?: string;
  }
interface ApiResponse {
    success: boolean;
  }
interface ProfilProps{
    quizName: string;
}

interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    error: string | null;
  }
  export interface Coordinates{
    latitude: number,
    longitude: number
}
interface QuizResponse {
    success: boolean;
    quiz: {
      Attributes: {
        questions: Array<{
          question: string;
          answer: string;
          location: {
            longitude: string;
            latitude: string;
          };
        }>;
        userId: string;
        quizId: string;
      };
    };
  }
  interface Quiz {
    questions: {
      question: string;
      answer: string;
      location: {
        longitude: string;
        latitude: string;
      };
    }[];
    userId: string;
    quizId: string;
    username: string;
  }
  interface Quizzes{
    success:boolean;
    quizzes: Quiz[]
}

export {LoginUserProps, SuccessLogin, ApiResponse, ProfilProps, 
    GeolocationState, Coordinates, QuizResponse, Quiz , Quizzes }