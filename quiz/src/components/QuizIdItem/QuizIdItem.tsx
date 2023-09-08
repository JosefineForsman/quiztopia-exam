import './QuizIdItem.css'
import { Quiz } from '../../interfaces';
import {useState, useEffect} from 'react';
import { getAllQuizzes } from '../../fetch/getAllquizzes';
import { deleteUserQuizById } from '../../fetch/deleteQuiz';

function QuizIdItem(){
    const username = sessionStorage.getItem('username')
    console.log(username);
    const [myQuizzes, setMyQuizzes] = useState<Quiz[]>([]);
    const [deleteMessage, setDeleteMessage] = useState<string>('')
 
    useEffect(() => {
        async function fetchData() {
          try {
            const data = await getAllQuizzes();
            const quizzes = data.quizzes;
      
            console.log("All quizzes:", quizzes);
      
            const filteredQuizzes = quizzes.filter((quiz) => quiz.username === username);
            setMyQuizzes(filteredQuizzes);
          } catch (error) {
            console.error("Error fetching quizzes:", error);
          }
        }
      
        fetchData();
      }, [username]);

      const deleteUserQuiz = async (selectedQuizId: string) => {
        try {
          const success = await deleteUserQuizById(selectedQuizId);
      
          if (success) {
            setMyQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.quizId !== selectedQuizId));
            setDeleteMessage('Quiz is now deleted');
          } else {
            setDeleteMessage('Failed to delete this quiz.')
          }
        } catch (error) {
          console.error("Error deleting quiz:", error);
        }
      };
    
      return( 
          <section className='my-quizzes'>
            <h3 className='my-quizzes__subtitle'>My quizzes:</h3>
            {myQuizzes.map((quiz, index) => (
            <div className='my-quizzes__container'key={index}>
              <p className='my-quizzes__title'>Quiz name: {quiz.quizId}</p>
              <button className='my-quizzes__delete-btn' onClick={() => deleteUserQuiz(quiz.quizId)}>Delete</button>
            </div>
            ))}
            <p className='my-quizzes__delete-message'>{deleteMessage}</p>
           </section>
      )
  }

export default QuizIdItem;