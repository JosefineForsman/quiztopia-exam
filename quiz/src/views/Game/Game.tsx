import Quizzes from '../../components/Quizzes/Quizzes';
import './Game.css';
import { useNavigate } from 'react-router-dom';
import goback from '../../assets/arrowback.png'

function Game(){
    const navigate = useNavigate()
    const goBack = () => {
        navigate('/')
      };
    return(
        <section className='game'>
            <header className='game__header'>
                <div>
                    <img src={goback} onClick={goBack} alt="go-back-icon" className='game-go-back' />
                </div>
                <h1 className='game__title'>GAME ON!</h1>
            </header>
            <Quizzes/>
        </section>

    )
}
export default Game;