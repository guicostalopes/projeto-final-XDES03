import { useState } from "react";
import { newRegister } from "../../Service/AutenticationService"; 
import './RegisterForm.css';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); 

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        
        setError(null); 
        setSuccess(null);

        console.log('Enviando registro com:', { username, email, password, role });

        try {
            const data = await newRegister(
                username,
                email,
                password,
                role
            );
            
            if (data) {
                setSuccess('Registro bem sucedido!');
                setUsername('');
                setEmail('');
                setPassword('');
                setRole('');
            }

        } catch (apiError) {
            setError(apiError.message);
            console.error(apiError.message);
        }
    };

    return(
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <div className="title-container">
                    <h3>Criar uma nova conta</h3>
                    <h5>É rápido e fácil!</h5>
                </div>
                
                <div className="input-register-container">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Nome"
                        id="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />  
                </div>

                <div className="input-register-container"> 
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /> 
                </div> 

                <div className="input-register-container"> 
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Senha"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div> 

                <div className="input-register-container">
                    <label htmlFor="role-select">Cargo</label>
                    <select 
                        name="role" 
                        id="role-select" 
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="" disabled>--Selecione uma opção--</option>
                        <option value="COLABORATOR">Colaborador</option>
                        <option value="STOCKHOLDER">Participante</option>
                        <option value="MANAGER">Gerente</option>
                    </select>
                </div>
                
                <div className="register-button">
                    <button type-="submit">Registrar</button>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
            </form>
        </div>
    );
}

export default RegisterForm;