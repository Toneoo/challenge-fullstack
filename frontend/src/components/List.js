import React from 'react';
import Button from './form/Button';
import ButtonDelete from './form/ButtonDelete';

function List({ products }) {
    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td className="p-0">
                                <div className="btn-group" role="group" aria-label="Ações">
                                    <Button text="Editar" link={`produtos/form/${product.id}`} />
                                    <Button text="Visualizar" link={`produtos/visualizar/${product.id}`} />
                                    <ButtonDelete productId={product.id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default List;
