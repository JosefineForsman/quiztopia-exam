import './Profil.css';
import { ChangeEvent, useState } from 'react';
import { createQuiz } from '../../Api/createQuizName';
import { useNavigate} from 'react-router-dom';
import Quizzes from '../../components/Quizzes/Quizzes';
import QuizIdItem from '../../components/QuizIdItem/QuizIdItem';
function Profil(){
    const [quizName, setQuizName] = useState<string>('');
    const [showQuizIdItem, setShowQuizIdItem] = useState(false);
    const [showAllQuizzes, setShowAllQuizzes] = useState(false);

    const navigate = useNavigate();

    const getQuizName = (event: ChangeEvent<HTMLInputElement>)=>{
        setQuizName(event.target.value)
    }

    const addNewQuiz = () => {
        createQuiz(quizName);
        console.log(quizName);

        sessionStorage.setItem('quizId', quizName);
        navigate('/form')
      };

      const toggleAllQuizzes = () => {
        setShowAllQuizzes(!showAllQuizzes);
      };

      const logOut = () => {
        sessionStorage.removeItem('username'); 
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('longitude');
        sessionStorage.removeItem('answer');
        sessionStorage.removeItem('question');
        sessionStorage.removeItem('latitude');
        sessionStorage.removeItem('quizId')
        navigate('/')
      };

    return(
        <section className="profil">
            <p>Profil View</p>
            <p>Välkommen</p>
            <article className='profil-container'>
                <input type="text" placeholder='Name on new quiz'
                value={quizName}
                onChange={getQuizName} />
                <button onClick={addNewQuiz}>ADD QUIZ</button>
                <button onClick={() => setShowQuizIdItem(!showQuizIdItem)}>MY QUIZZES</button>
                <button onClick={toggleAllQuizzes}>ALL QUIZZES</button>
                <button onClick={logOut}>LOG OUT</button>
                {showQuizIdItem &&  <QuizIdItem/>}
                {showAllQuizzes && <Quizzes />}
            </article>
        </section>

    )
}
export default Profil;