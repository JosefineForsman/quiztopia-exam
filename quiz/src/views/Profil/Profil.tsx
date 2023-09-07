import './Profil.css';
import { ChangeEvent, useState } from 'react';
import { createQuiz } from '../../fetch/createQuizName';
import { useNavigate} from 'react-router-dom';
import QuizIdItem from '../../components/QuizIdItem/QuizIdItem';
import goback from '../../assets/arrowback.png'
function Profil(){
    const [quizName, setQuizName] = useState<string>('');
    const [showQuizIdItem, setShowQuizIdItem] = useState(false);

    const navigate = useNavigate();

    const name = sessionStorage.getItem('username')

    const getQuizName = (event: ChangeEvent<HTMLInputElement>)=>{
        setQuizName(event.target.value)
    }

    const addNewQuiz = () => {
        createQuiz(quizName);
        console.log(quizName);

        sessionStorage.setItem('quizId', quizName);
        navigate('/form')
      };

      const goBack  = ()=>{
        navigate('/')
      }

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

      const goToGame = () =>{
        navigate('/game')
      }

    return(
        <section className="profil">
          <header className='profil__header'>
            <aside>
              <img onClick={goBack}src={goback} alt="go-back-icon" className='go-back-icon' />
              </aside>
              <aside>
                <h1 className='profil__title'>QUIZTOPIA</h1>
                <h3 className='profil__text'>Welcome to your profil {name}!</h3>
            </aside>
          </header>
            <article className='profil-container'>
                <button className='profil-btn' onClick={() => setShowQuizIdItem(!showQuizIdItem)}>MY QUIZZES</button>
                <button className='profil-btn'onClick={logOut}>LOG OUT</button>
                <button className='profil-btn' onClick={goToGame}>LET'S PLAY!</button>
            </article>
              <aside className='profil__add-quiz'>
                <p className='profil__body-text'>To begin a new quiz, follow these steps:</p>
                <ol>
                  <li>Create a quiz name.</li>
                  <li>Add a question and its answer.</li>
                  <li>Mark the location on the map where the question should appear.</li>
                  <li>Add as many questions as you'd like to your quiz.</li>
                  <li>You're done!</li>
                </ol>
                <aside className='profil__add-question'>
                  <input className='profil__input' type="text" placeholder='Quiz name:'
                  value={quizName}
                  onChange={getQuizName} />
                  <button className='profil__add-btn'onClick={addNewQuiz}>ADD QUIZ</button>
                </aside>
              </aside>
              <div className='profil__quiz-container'>
                {showQuizIdItem && <QuizIdItem/>}
            </div>
        </section>

    )
}
export default Profil;