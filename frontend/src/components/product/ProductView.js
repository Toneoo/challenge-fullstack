import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from "../form/Input";
import { useParams } from 'react-router-dom';
import BtnProduct from '../form/BtnProduct';


function ProductView() {

    const { id } = useParams()

    const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    description: ''
    });

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);
     const fetchProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get(`http://localhost:90/api/produtos/${id}`, config);
            const { name, price, quantity, description } = response.data.data;
            console.log(response.data.data);
            setFormData({
                name: name || '',
                price: price || '',
                quantity: quantity || '',
                description: description || ''
            });
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
        }
    };


    return (
        <div className="container mt-4">
        <div className="card">
            <div className="card-header bg-light">
                <div className="card-body">
                        <div className="form-row">
                              <div className="form-group col-md-4 mb-3">
                                <Input type="text" text="Produto" name="name"  disabled  value={formData.name} />
                            </div>
                              <div className="form-group col-md-4 mb-3">
                                <Input type="text" text="Preço" name="price" disabled value={formData.price} />
                            </div>
                              <div className="form-group col-md-4 mb-3">
                                <Input type="number" text="Quantidade" name="quantity" disabled value={formData.quantity} />
                            </div>
                            <div className="col-12 mb-3">
                                <Input type="textarea" text="Descrição" name="description" disabled value={formData.description} />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <BtnProduct />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductView;