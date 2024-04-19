import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { useHistory } from 'react-router-dom';
import BtnProduct from '../form/BtnProduct';

function ProductForm({ btnText, match }) {
    const history = useHistory();
    const productId = match.params.id;

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        active: true,
    });

    const [isMounted, setIsMounted] = useState(true);

    useEffect(() => {
        return () => {
            setIsMounted(false);
        };
    }, []);

    useEffect(() => {
        if (productId) {
            fetchProduct(productId);
        }
    }, [productId]);

    useEffect(() => {
    }, [formData])

    const fetchProduct = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`http://localhost:90/api/produtos/${productId}`, config);
            const { name, price, quantity, description, ativo } = response.data.data;
            console.log(response.data.data);
            setFormData({
                name: name || '',
                price: price || '',
                quantity: quantity || '',
                description: description || '',
                active: false, 
            });
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value; // Converte o valor do checkbox para 1 ou 0
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (productId) {
                await axios.put(`http://localhost:90/api/produtos/${productId}`, formData, config);
                console.log('Produto atualizado com sucesso!');
            } else {
                console.log(formData);
                await axios.post('http://localhost:90/api/produtos', formData, config);
                console.log('Produto criado com sucesso!');
            }

            history.push('/produtos', { message: 'Produto criado/atualizado com sucesso!' });
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-light">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="row">
                            <div className="form-group col-md-4 mb-3">
                                <Input type="text" text="Produto" name="name" value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div className="form-group col-md-4 mb-3">
                                <Input type="text" text="Preço" name="price" value={formData.price} onChange={handleInputChange} />
                            </div>
                            <div className="form-group col-md-4 mb-3">
                                <Input type="number" text="Quantidade" name="quantity" value={formData.quantity} onChange={handleInputChange} />
                            </div>
                            <div className="col-12 mb-3">
                                <Input type="textarea" text="Descrição" name="description" value={formData.description} onChange={handleInputChange} />
                            </div>
                            <div className="col-12 mb-3">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="active"
                                        className="form-check-input"
                                        checked
                                        onChange={handleInputChange}
                                    />
                                    Ativo
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                        <div>
                            <BtnProduct />
                        </div>
                        <div className="ml-auto">
                            <SubmitButton text="Salvar" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;
