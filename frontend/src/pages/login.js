import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:90/api/login', credentials);
      console.log('Login bem-sucedido:', response.data);
      
      localStorage.setItem('token', response.data.token);
      
      onLogin(); 

      history.push('/produtos'); 
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email:</label>
                  <input className="form-control" type="email" name="email" value={credentials.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Senha:</label>
                  <input className="form-control" type="password" name="password" value={credentials.password} onChange={handleChange} />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
