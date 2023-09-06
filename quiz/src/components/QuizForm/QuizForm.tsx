import './QuizForm.css';
import { useState } from 'react';
import { sendQuizQuestion } from '../../Api/createQuestion';

interface QuizFormProps{
    newLng: number;
    newLat: number;
    setNewLat: React.Dispatch<React.SetStateAction<number>>;
    setNewLng: React.Dispatch<React.SetStateAction<number>>;
}
function QuizForm({newLng,newLat}: QuizFormProps){
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    const handleQuestion = async () => {
        console.log('handleQuestion called'); 
        try {
          const quizId = sessionStorage.getItem('quizId');
          const newLatString = newLat.toString();
          const newLngString = newLng.toString();
          
          if (question && answer && newLatString && newLngString && quizId) {
              sessionStorage.setItem('question', question);
              sessionStorage.setItem('answer', answer)
              await sendQuizQuestion(quizId, question, answer,newLngString, newLatString);
              
            } else {
                console.log('något saknas')
            }
            console.log(`Latitude: ${newLatString}, Longitude: ${newLngString}, QuizId: ${quizId}`, answer, question); // Add this line
        } catch (error) {
            console.log('Error:' , error)
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