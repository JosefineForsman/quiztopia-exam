import './QuizForm.css';
import { useState } from 'react';
import { sendQuizQuestion } from '../../Api/createQuestion';

function QuizForm(){
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    const handleQuestion = async () => {
        console.log('handleQuestion called'); 
        try {
          const latitude = sessionStorage.getItem('latitude');
          const longitude = sessionStorage.getItem('longitude');
          const quizId = sessionStorage.getItem('quizId');
          

          console.log(`Latitude: ${ typeof latitude}, Longitude: ${ typeof longitude}, QuizId: ${quizId}`, answer, question); // Add this line
    
          if (question && answer && latitude && longitude && quizId) {
            sessionStorage.setItem('question', question); // Save the question value
            sessionStorage.setItem('answer', answer)
            await sendQuizQuestion(quizId, question, answer, longitude, latitude);

            // Handle successful handling if needed
          } else {
            console.log('något saknas')
            // Handle incorrect values if needed
          }
        } catch (error) {
          // Handle error if needed
        }
      };

    return(
        <section className='quiz-form'>
            <p>Quiz Form Component</p>
            <input type="text" placeholder='Question:'
            onChange={(e) => setQuestion(e.target.value)} />
            <input type="text" placeholder='Answer:'
            onChange={(e) => setAnswer(e.target.value)} />
            <button onClick={handleQuestion}>Save </button>
        </section>
    )
}
export default QuizForm;