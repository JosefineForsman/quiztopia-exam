import './CreateUser.css';
import { useState } from 'react';
import { createUser } from '../../fetch/createUserFetch';
import LoginUser from '../LoginUser/LoginUser';
import create from '../../assets/purplecreate.png'

function CreateUser() {
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const createNewUser = async () => {
    const success = await createUser(username, password);

    if (success) {
      setSuccess(true);
      sessionStorage.setItem('username', username);
      setShowLogin(true)
    } else {
      setMessage('Could not create user, username already exists.');
    }
  };

  const goToLogin = () =>{
    setShowLogin(!showLogin);
  }

  return (
    <section className="create-user">
      {!success && !showLogin ? (
        <article className="create-user__container">
          <h2 className='create-user__title'>Welcome to Quiztopia! </h2>
          <img src={create} alt="create-user" className='create-user__img' />
          <p className='create-user__sub-title'>Create an account</p>
          <input
            className='create-user__input'
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className='create-user__input'
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
          className='create-user__btn'
          onClick={createNewUser}>Sign in</button>
          <aside className='create-user__login'>Already have an account? 
            <button className='create-user__login-btn'
            onClick={goToLogin}>Log in</button>
          </aside>
          <p className='create-user__sub-title'>{message}</p>
        </article>
      ) : (
        <LoginUser />
      )}
    </section>
  );
}

export default CreateUser;