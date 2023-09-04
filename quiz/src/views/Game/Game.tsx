import Quizzes from '../../components/Quizzes/Quizzes';
import './Game.css';
import { useNavigate } from 'react-router-dom';

function Game(){
    const navigate = useNavigate()
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
        <section className='game'>
            <header>
                <h1>Game on!</h1>
            </header>
            <Quizzes/>
            <button onClick={logOut}>Log out</button>
        </section>

    )
}
export default Game;