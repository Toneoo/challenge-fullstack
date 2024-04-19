import React, { useState } from 'react';
import Input from "../form/Input";
import Button from "../form/Button";
import BtnProduct from "../form/BtnProduct";

function ProductIndex({ onDataSubmit }) {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        quantity: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-light">
                    <div className="card-body">
                        <form className="row">
                            <div className="form-group col-md-4 mb-3">
                                <Input type="number" text="ID" name="id" onChange={handleChange} />
                            </div>
                            <div className="form-group col-md-4 mb-3">
                                <Input type="text" text="Produto" name="name" onChange={handleChange} />
                            </div>
                            <div className="form-group col-md-4 mb-3">
                                <Input type="number" text="Quantidade" name="quantity" onChange={handleChange} />
                            </div>
                        </form>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                        <div>
                            <BtnProduct />
                        </div>
                        <button onClick={() => onDataSubmit(formData)} className="btn btn-primary">Buscar</button>
                        <div>
                            <Button text="Criar Produto" link="produtos/form" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductIndex;
