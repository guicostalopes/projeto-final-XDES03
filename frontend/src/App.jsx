import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForms from "./components/Login/LoginForms.jsx";
import RegistrationForm from "./components/Register/RegisterForm.jsx"; 
import './index.css'; 
import ProductPage from "./components/ProductPage/ProductPage.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <div className="container-centralizado"> 
                <Routes>
                    <Route path="/login" element={<LoginForms />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/" element={<LoginForms />} />
                    <Route path="/:username/products" element={<ProductPage/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;