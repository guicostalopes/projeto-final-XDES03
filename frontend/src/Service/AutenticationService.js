import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1.0';

const getAuthHeader = () => {
    const token = localStorage.getItem('user_token');
    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
};

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

export const newProduct = async(productName, price, quantity, category) => {
    
    const productData = {
        name : productName,
        price : price,
        quantity : quantity,
        category : category
    };

    try{
        const response = await axios.post(
            `${API_URL}/api/products`,
            productData, 
            { headers: getAuthHeader() } 
        );
        return response.data;

    }catch(error){ 
        const errorMessage = error.response?.data?.message || "Falha no registro do produto.";
        console.error("Erro no registro do produto:", errorMessage);
        throw new Error(errorMessage);
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/api/products`,
            { headers: getAuthHeader() } 
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Falha ao buscar produtos");
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(
            `${API_URL}/api/products/${productId}`,
            { headers: getAuthHeader() } 
        );
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar produto:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Falha ao deletar produto");
    }
};

