import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginUser from '../../components/LoginUser/LoginUser';
import CreateUser from '../../components/CreateUser/CreateUser';
import { getPosition } from '../../Api/geolocation';
import { getAllQuizzes } from '../../Api/getAllquizzes';
import map from '../../assets/karta.svg'
import './Landing.css';

function Landing() {
  const [showLoginUser, setShowLoginUser] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);

  const navigate = useNavigate();
  getPosition()

  const handleLoginClick = () => {
    setShowLoginUser(!showLoginUser);
    setShowCreateUser(false);
  };

  const handleSignUpClick = () => {
    setShowLoginUser(false);
    setShowCreateUser(!showCreateUser);
  };

  const handlePlayNow = async () =>{
    navigate('/game')
    getAllQuizzes();
  }

  return (
    <section className="landing" >
      <header>
        <h1 className='landing__title'>QUIZTOPIA</h1>
      </header>
      <aside className='landing-container'>
          <button className='landing-btn' onClick={handleLoginClick}>LOG IN</button>
          <button className='landing-btn' onClick={handleSignUpClick}>SIGN UP</button>
          <button className='landing-btn' onClick={handlePlayNow}>PLAY NOW</button>
      </aside>
          {showCreateUser && <CreateUser />}  
          {showLoginUser && <LoginUser/>}
    </section>
  );
}

export default Landing;