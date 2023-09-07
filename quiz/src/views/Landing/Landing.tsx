import { useNavigate } from 'react-router-dom';
import CreateUser from '../../components/CreateUser/CreateUser';
import { getPosition } from '../../fetch/geolocation';
import { getAllQuizzes } from '../../fetch/getAllquizzes';

import './Landing.css';

function Landing() {

  const navigate = useNavigate();
  getPosition()

  const handlePlayNow = async () =>{
    navigate('/game')
    getAllQuizzes();
  }

  return (
    <section className="landing" >
      <header>
        <h1 className='text__title'>QUIZTOPIA</h1>
        <p className='landing__sub-title'>Are you ready to play some quizzes?</p>
      </header>
      <aside className='landing-container'>
          <CreateUser />
          <button className='landing-btn' onClick={handlePlayNow}>PLAY NOW</button>
      </aside> 
    </section>
  );
}

export default Landing;