import { useNavigate } from 'react-router-dom';
import CreateUser from '../../components/CreateUser/CreateUser';
import { getPosition } from '../../fetch/geolocation';
import { useState } from 'react';
import './Landing.css';

function Landing() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const handlePlayNow = async () => {
    try {
      await getPosition();
      navigate('/game');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('To use this app, please enable location services in your browser settings.')
      
    }
  }

  return (
    <section className="landing" >
      <header>
        <h1 className='text__title'>QUIZTOPIA</h1>
        <p className='landing__sub-title'>Are you ready to play some quizzes?</p>
      </header>
      <aside className='landing-container'>
        <p className='landing__error-message'>{errorMessage}</p>
          <CreateUser />
          <button className='landing-btn' onClick={handlePlayNow}>PLAY NOW</button>
      </aside> 
    </section>
  );
}

export default Landing;