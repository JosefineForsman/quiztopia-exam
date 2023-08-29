import { useState } from 'react';
import LoginUser from '../../components/LoginUser/LoginUser';
import CreateUser from '../../components/CreateUser/CreateUser';
import './Landing.css';

function Landing() {
  const [showCreateUser, setShowCreateUser] = useState(false);

  const handleCreateAccount = () => {
    setShowCreateUser(true);
  };

  return (
    <section className="landing">
      <p>Landing View</p>
      {showCreateUser ? (
        <CreateUser />
      ) : (
        <>
          <LoginUser />
          <p>If you don't have an account?</p>
          <button onClick={handleCreateAccount}>Create Account</button>
        </>
      )}
    </section>
  );
}

export default Landing;