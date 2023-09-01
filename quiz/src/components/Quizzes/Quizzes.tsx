import './Quizzes.css';
import { Quiz, QuizResponse, Quizzes } from '../../interfaces';
import { getAllQuizzes } from '../../Api/getAllquizzes'
import { useState, useEffect } from 'react';

function Quizzes() {
    const[quizzes, setQuizzes]= useState<Quiz[] | null>([])
  

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data: Quizzes = await getAllQuizzes();
        setQuizzes(data.quizzes);
        console.log(quizzes);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);
    return (
        <div>
          <h2>Quizzes</h2>
          {quizzes ? (
        <ul>
          {quizzes.map((quiz, index) => (
            <li key={index}>Name:{quiz.quizId} 
            <p>Creator:{quiz.userId}</p></li>
          ))}
        </ul>
      ) : (
        <p>Loading quizzes...</p>
      )}

        </div>
      );
    }

  export default Quizzes;