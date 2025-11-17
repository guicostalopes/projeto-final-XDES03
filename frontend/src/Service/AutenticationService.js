import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1.0';

export const newLogin = async(email, password) =>{
    const loginData = {
        email: email,
        password: password
    };

    try{
        const response = await axios.post(
            `${API_URL}/api/auth/login`,
            loginData
        );
        
        return response.data;

    }catch(error){
        console.error("Erro no login", error.response?.data?.message || error.message);
        return null;
    }
};

export const newRegister = async(username, email, password, role) =>{
    const registerData = {
        username : username,
        email : email,
        password : password,
        role : role
    };
    try{
        const response = await axios.post(
            `${API_URL}/api/register`,
            registerData
        );
        return response.data;

    }catch(error){
        const errorMessage = error.response?.data?.message || "Falha no registro.";
        console.error("Erro no registro:", errorMessage);
        throw new Error(errorMessage);
    }
}