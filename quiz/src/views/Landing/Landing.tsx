import { useState } from 'react';
import LoginUser from '../../components/LoginUser/LoginUser';
import CreateUser from '../../components/CreateUser/CreateUser';
import './Landing.css';

function Landing() {
  const [showLoginUser, setShowLoginUser] = useState(true);
  const [showCreateUser, setShowCreateUser] = useState(false);

  const handleLoginClick = () => {
    setShowLoginUser(true);
    setShowCreateUser(false);
  };

  const handleSignUpClick = () => {
    setShowLoginUser(false);
    setShowCreateUser(true);
  };

  return (
    <section className="landing">
      <p>Landing View</p>
      <button onClick={handleLoginClick}>LOG IN</button>
      <button onClick={handleSignUpClick}>SIGN UP</button>
      <button>PLAY NOW</button>
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