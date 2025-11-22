import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../Service/AutenticationService'; 
import './ProductPage.css'; 
import './Modal';

const ProductPage = () => {
   
    const { username } = useParams();
    const navigate = useNavigate();
    const userRole = localStorage.getItem('user_role');
    const isAdmin = (userRole === 'ADMIN');
    const userCharacter = localStorage.getItem('user_starWarsCharacter');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
    
        const token = localStorage.getItem('user_token');
        if (!token) {
            navigate('/login');
            return; 
        }

        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data);
            } catch (apiError) {
                setError(apiError.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

    }, [navigate]); 

    // 4. Função de Deletar
    const handleDelete = async (productId) => {
        if (!window.confirm("Tem certeza que deseja deletar este produto?")) {
            return;
        }

        try {
            await deleteProduct(productId);
            // Atualiza a lista localmente
            setProducts(products.filter(p => p.id !== productId));
        } catch (apiError) {
            setError(apiError.message);
        }
    };

    // 5. Renderização Condicional (Loading/Erro)
    if (loading) {
        return <div className="loading-container">Carregando produtos...</div>;
    }

    if (error) {
        return <div className="error-container">Erro: {error}</div>;
    }

    // 6. JSX Principal
    return (
        <div className="product-page-container">
            
            <h1>Página de Produtos</h1>
            <h2>Que a força esteja com você, {userCharacter}!</h2>
            
            {isAdmin && (
                <div className="admin-actions">
                    <div>
                        <button onClick={() => setOpenModal(true)}  className="add-product-btn">Adicionar Novo Produto</button>
                    </div>
                    <Modal isOpen={openModal} />
                </div>
            )}

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Categoria</th>
                        {isAdmin && <th>Ações</th>}
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.id}>                        
                                <td>{product.name}</td> 
                                <td>R$ {product.price.toFixed(2)}</td>
                                <td>{product.quantity}</td>
                                <td>{product.category}</td>
                                
                                {isAdmin && (
                                    <td className="action-buttons">
                                        <button className="edit-btn">Editar</button>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={isAdmin ? 5 : 4} style={{ textAlign: 'center' }}>
                                Nenhum produto encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductPage;