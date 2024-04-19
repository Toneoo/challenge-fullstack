import { Link } from 'react-router-dom';

function BtnProduct() {
    return (
        <div>
            <Link className="btn btn-success" to="/produtos">Voltar</Link>
        </div>
    );
}

export default BtnProduct;
