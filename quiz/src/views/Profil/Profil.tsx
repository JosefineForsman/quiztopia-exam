import './Profil.css';
import { ChangeEvent, useState, useEffect } from 'react';
import { createQuiz } from '../../Api/createQuizName';
import { useNavigate } from 'react-router-dom';
import { getAllQuizzes } from '../../Api/getAllquizzes';
import Quizzes from '../../components/Quizzes/Quizzes';
function Profil(){
    const [quizName, setQuizName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [showMyQuizzes, setShowMyQuizzes] = useState<boolean>(false);


    const navigate = useNavigate();

    const getQuizName = (event: ChangeEvent<HTMLInputElement>)=>{
        setQuizName(event.target.value)
    }
    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }, []);

    const addNewQuiz = () => {
        createQuiz(quizName);
        console.log(quizName);

        sessionStorage.setItem('quizId', quizName);
        navigate('/form')
      };

      const toggleMyQuizzes = () => {
        setShowMyQuizzes(!showMyQuizzes); 
        getAllQuizzes();

      };

      const logOut = () => {
        sessionStorage.removeItem('username'); 
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('longitude');
        sessionStorage.removeItem('quizId');
        sessionStorage.removeItem('answer');
        sessionStorage.removeItem('question');
        sessionStorage.removeItem('latitude');
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
                <button onClick={toggleMyQuizzes}>MY QUIZES</button>
                <button onClick={logOut}>LOG OUT</button>
                {showMyQuizzes &&  <Quizzes/>}
            </article>
        </section>

    )
}
export default Profil;