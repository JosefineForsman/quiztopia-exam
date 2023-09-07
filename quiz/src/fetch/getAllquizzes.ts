import { Quizzes } from "../interfaces";

async function getAllQuizzes(): Promise<Quizzes> {
    try {
      const url: string = `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz`;
      const response = await fetch(url);
      
      if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(data);
    
      return data;
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      throw error;
    }
  }
export {getAllQuizzes}