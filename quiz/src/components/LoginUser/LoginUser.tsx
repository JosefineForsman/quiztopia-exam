import './LoginUser.css';
import { SuccessLogin } from '../../interfaces';
import { logInUser } from '../../Api/signUpUser';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import login from '../../assets/loginpurple.png'

function LoginUser() {
  const [message, setMessage] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const logIn = async () => {
    const data: SuccessLogin = await logInUser(username, password);
    console.log(data);

    if (data.success) {
      setMessage('You are now signed in.');
      sessionStorage.setItem('username', username)
      navigate('/profil'); // inkludera username i state
    }
    if (data.token) {
      setToken(data.token);
      sessionStorage.setItem('token', data.token);
      console.log(token);
    } else {
      setMessage('This username does not exist, if you do not have an account, go to sign in.');
    }
  };

  return (
    <section className="login-user">
      <article className="login-user__container">
        <h2 className='login-user__title'>Welcome to Quiztopia!</h2>
        <img src={login} alt="login-icon" className='login-user__img' />
        <p className='login-user__sub-title'>Log in on your account</p>
        <input 
            className='login-user__input'
            type="text"
            placeholder="Username"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} />
          <input 
            className='login-user__input'
            type="text" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} />
          <button className='login-user__btn'onClick={logIn}>Log in</button>
          <p>{message}</p>
      </article>
    </section>
  );
}

export default LoginUser;