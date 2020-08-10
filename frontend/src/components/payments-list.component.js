import React, { Component } from 'react';
import PaymentService from '../services/payment.service';

export default class PaymentsList extends Component {

    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrievePayments = this.retrievePayments.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePayment = this.setActivePayment.bind(this);
        this.removeAllPayments = this.removeAllPayments.bind(this);
        this.searchName = this.searchName.bind(this);
        
        this.state = {
            payments: [],
            currentPayment: null,
            currentIndex: -1,
            searchName: ""
        };         
    }

    componentDidMount() {
        this.retrievePayments();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;
        this.setState({
            searchName: searchName
        });
    }

    retrievePayments() {
        PaymentService.getAll()
          .then(response => {
            this.setState({
                payments: response.data
            })
          }).catch(e => {
              console.error(e);
          });
    }

    refreshList() {
        this.retrievePayments();
        this.setState({
          currentPayment: null,
          currentIndex: -1
        });
    }

    setActivePayment(payment, index) {
        this.setState({
            currentPayment: payment,
            currentIndex: index
        });   
    }

    removeAllPayments() {
        PaymentService.deleteAll()
          .then(response => {
            console.info(response.data);
            this.retrievePayments();
          }).catch(err => {
              console.error(err);
              this.retrievePayments();
          });          
    }

    searchName() {
        PaymentService.findByName(this.state.searchName)
          .then(response => {
              console.info(response.data);
              this.setState({
                  payments: response.data
              });
          }).catch(e => {
              console.error(e);
          });
    }

    formatDate(current_datetime) {
      let formatted_date = '';
      if (current_datetime) {
        const data = new Date(current_datetime);
        formatted_date = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
      }
      return formatted_date;
    }

    formatValue(value) {      
      return value ? value.toFixed(2) : value;
    }

    render() {
        console.log(this.state);
        const { searchName, payments, currentPayment, currentIndex } = this.state;
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input type="text"
                  className="form-control"
                  placeholder="Procurar por Nome"
                  value={searchName}
                  onChange={this.onChangeSearchName} />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.searchName}>
                      Procurar
                    </button>
                  </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <h4>Lista de Pagamentos</h4>
              <ul className="list-group">
                {payments &&
                 payments.map((payment, index) => (
                   
                  <li className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                    onClick={() => this.setActivePayment(payment, index)}
                    key={index} >
                    {payment.name}
                  </li>
                 ))
               }
              </ul>
              <button className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllPayments}>
                Remover Todos os Pagamentos
              </button>
            </div>
            
            <div className="col-md-6">
              {currentPayment ? (
              <div>
                <h4>Pagamento</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentPayment.name}
              </div>
              
              <div>
                <label>
                  <strong>Descrição:</strong>
                </label>{" "}
                {currentPayment.description}
              </div>

              <div>
                <label>
                  <strong>Valor:</strong>
                </label>{" "}
                {this.formatValue(currentPayment.value)}
              </div>
              
              <div>
                <label>
                  <strong>Data:</strong>
                </label>{" "}
                {this.formatDate(currentPayment.date)}
              </div>

              <div>
                <label>
                  <strong>Tags:</strong>
                </label>{" "}
                {currentPayment.tags}
              </div>
            </div>
          
          ) : (
            <div>
              <br />
              <p>Por favor selecione um pagamento.</p>
            </div>
          )}
        </div>
      </div>
      );
    }

}
  

    


