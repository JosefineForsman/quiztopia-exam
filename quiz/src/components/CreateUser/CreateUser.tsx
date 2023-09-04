import './CreateUser.css';
import { useState } from 'react';
import { createUser } from '../../Api/createUserFetch';
import LoginUser from '../LoginUser/LoginUser';

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
      setMessage(`User ${username} is now created`);
      sessionStorage.setItem('username', username);
      setShowLogin(true)
    } else {
      setMessage('Could not create user, username already exists.');
    }
  };

  return (
    <section className="create-user">
      {!success && (
        <article className="login-user__container">
          <h2>Create user:</h2>
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
          onClick={createNewUser}>Submit</button>
          <p>{message}</p>
        </article>
      )}
      {success && <LoginUser />}
    </section>
  );
}

export default CreateUser;