import Quizzes from '../../components/Quizzes/Quizzes';
import './Game.css';
import { useNavigate } from 'react-router-dom';

function Game(){
    const navigate = useNavigate()
    const logOut = () => {
        navigate('/')
      };
    return(
        <section className='game'>
            <header>
                <h1>Game on!</h1>
            </header>
            <Quizzes/>
            <button onClick={logOut}>Go back</button>
        </section>

    )
}
export default Game;