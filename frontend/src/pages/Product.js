import React, { useState, useEffect } from 'react';
import axios from 'axios';
import List from '../components/List';
import ProductIndex from '../components/product/ProductIndex';
import { useLocation } from 'react-router-dom';

function Product() {
    const [products, setProducts] = useState([]);

    const location = useLocation();
    const message = location.state && location.state.message;

    const handleFormDataSubmit = (formData) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const queryParams = new URLSearchParams(formData).toString();
        const url = `http://localhost:90/api/produtos?${queryParams}`;

        axios.get(url, config)
            .then(response => {
                setProducts(response.data.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.get('http://localhost:90/api/produtos', config)
          .then(response => {
            setProducts(response.data.data);
          })
          .catch(error => {
            console.error('error');
          });
    }, []);

    return (
        <div className="container mt-4">
            <h1>Produtos</h1>
            {message && <div className="alert alert-success">{message}</div>}
            <ProductIndex onDataSubmit={handleFormDataSubmit} />
            <List products={products} />
        </div>
    );
}

export default Product;
