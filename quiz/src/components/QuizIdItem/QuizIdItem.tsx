import './QuizIdItem.css'
import { Quiz } from '../../interfaces';
import {useState, useEffect} from 'react';
import { getAllQuizzes } from '../../Api/getAllquizzes';
import { deleteUserQuizById } from '../../Api/deleteQuiz';
import Quizzes from '../Quizzes/Quizzes';


function QuizIdItem(){
    const username = sessionStorage.getItem('username')
    console.log(username);
    const [myQuizzes, setMyQuizzes] = useState<Quiz[]>([]);
    const [selectedQuizId, setSelectedQuizId] = useState<string>('');
    const [deleteMessage, setDeleteMessage] = useState<string>('')

    
    useEffect(() => {
        async function fetchData() {
          try {
            const data = await getAllQuizzes();
            const quizzes = data.quizzes;
      
            console.log("All quizzes:", quizzes);
      
            const filteredQuizzes = quizzes.filter((quiz) => quiz.username === username);
            setMyQuizzes(filteredQuizzes);
            console.log("Filtered quizzes:", filteredQuizzes);
          } catch (error) {
            console.error("Error fetching quizzes:", error);
          }
        }
      
        fetchData();
      }, [username]);

      const deleteUserQuiz = async (selectedQuizId: string) => {
        try {
          const success = await deleteUserQuizById(selectedQuizId);
          console.log("deleteUserQuizById success:", success);
      
          if (success) {
            // Ta bort quizet från myQuizzes om det lyckades radera
            setMyQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.quizId !== selectedQuizId));
            setDeleteMessage('Quiz is now deleted');
          } else {
            console.log("Quiz deletion failed.");
            setDeleteMessage('Failed to delete this quiz.')
          }
        } catch (error) {
          console.error("Error deleting quiz:", error);
        }
    
      };
    
      return( 
          <section className='my-quizzes'>
            My quizzes
            {myQuizzes.map((quiz, index) => (
                <div key={index}>
                <p>name: {quiz.username}</p> quizid:{quiz.quizId}
                <button onClick={() => deleteUserQuiz(quiz.quizId)}>Delete</button>
            </div>
            ))}
            <p>{deleteMessage}</p>
           </section>
      )
  }

export default QuizIdItem;