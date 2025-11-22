import { useState } from 'react';
import { newLogin } from "../../Service/AutenticationService";
import { Link, useNavigate } from 'react-router-dom';
import './LoginForms.css';

const LoginForms = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError(null);

    console.log('Enviando login com:', { email, password });

    const data = await newLogin(email, password);

    if (data && data.token) {
      console.log('Login bem sucedido!', data.token);

      localStorage.setItem('user_token', data.token);
      localStorage.setItem('user_username', data.username);
      localStorage.setItem('user_role', data.role);
      localStorage.setItem('user_starWarsCharacter', data.starWarsCharacter);
      navigate(`/${data.username}/products`);

    } else {
      console.error('Falha no login');
      setError('E-mail ou senha inválidos.');
    }
  };

  return (
    
    <div className='login-page-container'>
      <form onSubmit={handleSubmit} className='login-form'>
      
        <h2>Oi professor, vamos logar?</h2>
      
        <div className='input-container'>
          <label htmlFor="email-login" style={{display: 'none'}}>Email</label>
          <input 
            placeholder='email'
            type="email" 
            name="email" 
            id="email-login"
            required
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='input-container'>
          <label htmlFor="password-login" style={{display: 'none'}}>Senha</label>
          <input 
            placeholder='senha'
            type="password" 
            name="password" 
            id="password-login"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='container-button'>
          <button type="submit">Entrar</button>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className='container-register'>
          <p>Ainda não tem conta?
            <a 
              className='register-link' 
              target='_blank' 
              href="http://localhost:5173/register"
            > 
              Criar conta
            </a>
          </p>
        </div>
      </form>
    </div>

  );
}

export default LoginForms;