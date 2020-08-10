import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AddPayment from './components/add-payment.component';
import PaymentsList from './components/payments-list.component';
import Payment from './components/payment.component';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="\payments" className="navbar-brand">
            Cadastro de Pagamentos
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/payments"} className="nav-link">
                Pagamentos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Adicionar Pagamento
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/payments"]} component={PaymentsList} />
            <Route exact path="/add" component={AddPayment} />
            <Route exact path="/payments/:id" component={Payment} /> 
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
