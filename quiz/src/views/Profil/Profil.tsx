import './Profil.css';
import { ChangeEvent, useState, useEffect } from 'react';
import { createQuiz } from '../../Api/createQuizName';
import { useNavigate } from 'react-router-dom';
import MyQuizzes from '../../components/MyQuizzes/MyQuizzes';
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

        // Använd sessionStorage.setItem för att spara quizId som en array
        const quizIds = sessionStorage.getItem('quizIds');
        if (quizIds) {
          const quizIdArray = JSON.parse(quizIds) as string[];
          quizIdArray.push(quizName);
          sessionStorage.setItem('quizIds', JSON.stringify(quizIdArray))
          console.log(JSON.stringify(sessionStorage.quizIds));
          
          setQuizName(''); 
        } else {
          sessionStorage.setItem('quizIds', JSON.stringify([quizName]));
        }
      };

      const toggleMyQuizzes = () => {
        setShowMyQuizzes(!showMyQuizzes); 
      };

      const logOut = () => {
        sessionStorage.removeItem('username'); 
        sessionStorage.removeItem('token');
        navigate('/')
      };

    return(
        <section className="profil">
            <p>Profil View</p>
            <p>Välkommen {username}</p>
            <article className='profil-container'>
                <input type="text" placeholder='Name on new quiz'
                value={quizName}
                onChange={getQuizName} />
                <button onClick={addNewQuiz}>ADD QUIZ</button>
                <button onClick={toggleMyQuizzes}>MY QUIZES</button>
                {showMyQuizzes && <MyQuizzes />}
                <button onClick={logOut}>LOG OUT</button>
            </article>
        </section>

    )
}
export default Profil;