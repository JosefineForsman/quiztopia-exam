import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginUser from '../../components/LoginUser/LoginUser';
import CreateUser from '../../components/CreateUser/CreateUser';
import { getPosition } from '../../Api/geolocation';
import { getAllQuizzes } from '../../Api/getAllquizzes';
import './Landing.css';

function Landing() {
  const [showLoginUser, setShowLoginUser] = useState(true);
  const [showCreateUser, setShowCreateUser] = useState(false);

  const navigate = useNavigate();
  getPosition()

  const handleLoginClick = () => {
    setShowLoginUser(true);
    setShowCreateUser(false);
  };

  const handleSignUpClick = () => {
    setShowLoginUser(false);
    setShowCreateUser(true);
  };

  const handlePlayNow = async () =>{
    navigate('/game')
    getAllQuizzes();
  }

  return (
    <section className="landing">
      <p>Landing View</p>
      <button onClick={handleLoginClick}>LOG IN</button>
      <button onClick={handleSignUpClick}>SIGN UP</button>
      <button onClick={handlePlayNow}>PLAY NOW</button>
      {showLoginUser && <LoginUser />}
      {showCreateUser && (
        <>
          <CreateUser />
        </>
      )}
    </section>
  );
}

export default Landing;