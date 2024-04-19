import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Product from './pages/Product';
import ViewProduct from './pages/ViewProduct';
import ProductForm from './components/product/ProductForm';
import Login from './pages/login';

function App() {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:90/api/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Adiciona o token ao cabeçalho Authorization
        }
      });
      setAuthenticated(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {authenticated ? <Redirect to="/produtos" /> : <Login onLogin={handleLogin} />}
        </Route>
        <Route exact path="/produtos" render={() => (
          authenticated ? <Product onLogout={handleLogout} /> : <Redirect to="/" />
        )} />
        <Route exact path="/produtos/form/:id?" render={(props) => (
          authenticated ? <ProductForm {...props} /> : <Redirect to="/" />
        )} />
        <Route exact path="/produtos/visualizar/:id?" render={(props) => (
          authenticated ? <ViewProduct {...props} /> : <Redirect to="/" />
        )} />
      </Switch>
    </Router>
  );
}

export default App;
