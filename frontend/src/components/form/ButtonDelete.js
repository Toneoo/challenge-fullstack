import React from 'react';
import axios from 'axios';

function ButtonDelete({ productId, onSuccess }) {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Tem certeza de que deseja excluir este produto?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:90/api/produtos/${productId}`, config);
                if (onSuccess) {
                    onSuccess();
                }
                window.location.reload();
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
            }
        }
    };

    return (
        <div>
            <button className="btn btn-danger" onClick={handleDelete}>Excluir</button>
        </div>
    );
}

export default ButtonDelete;
