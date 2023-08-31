import './LoginUser.css';
import { SuccessLogin } from '../../interfaces';
import { logInUser } from '../../Api/signUpUser';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
      navigate('/profil');
    }
    if (data.token) {
      setToken(data.token);
      sessionStorage.setItem('token', data.token);
      console.log(token);
    } else {
      setMessage('You were not able to sign in');
    }
  };

  return (
    <section className="login-user">
      <p>Login User Component</p>
      <article className="login-user__container">
        <input
          type="text"
          placeholder="Username"
          value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={logIn}>Log in</button>
        <p>{message}</p>
      </article>
    </section>
  );
}

export default LoginUser;