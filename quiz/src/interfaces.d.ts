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
export {LoginUserProps, SuccessLogin, ApiResponse, ProfilProps }