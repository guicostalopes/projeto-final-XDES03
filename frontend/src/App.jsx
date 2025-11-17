import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. Importe seus dois componentes de "página"
import LoginForms from "./components/Login/LoginForms.jsx";
import RegistrationForm from "./components/Register/RegisterForm.jsx"; // (Importe seu formulário de registro)

// 2. Importe o CSS que centraliza
import './index.css'; 

const App = () => {
    return (
        // 3. Envolva tudo em <BrowserRouter>
        <BrowserRouter>
            {/* 4. Use a div de centralização aqui */}
            <div className="container-centralizado"> 
                {/* 5. <Routes> decide qual componente mostrar */}
                <Routes>
                    {/* Se a URL for "/", mostre o LoginForms */}
                    <Route path="/" element={<LoginForms />} />
                    
                    {/* Se a URL for "/login", mostre o LoginForms */}
                    <Route path="/login" element={<LoginForms />} />
                    
                    {/* Se a URL for "/register", mostre o RegistrationForm */}
                    <Route path="/register" element={<RegistrationForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;