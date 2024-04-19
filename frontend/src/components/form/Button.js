import { Link } from 'react-router-dom';

function Button({ text, link }) {
    return (
        <div>
            <Link className="btn btn-success" to={link}>{text}</Link>
        </div>
    );
}

export default Button;
