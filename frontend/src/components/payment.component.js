import React, { Component } from 'react';
import PaymentService from '../services/payment.service';


export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.getPayment = this.getPayment.bind(this);
        this.deletePayment = this.deletePayment.bind(this);

        this.state = {
            currentPayment: {
                id: null,
                name: "",
                description: "",
                value: 0
            },
            message: ""
        };    
    }

    componentDidMount() {
        this.getPayment(this.props.match.params.id);
    }


    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentPayment: {
                    ...prevState.currentPayment,
                    name: name
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(function(prevState) {
            return {
                currentPayment: {
                    ...prevState.currentPayment,
                    description: description               
                }
            };
        });
    }

    onChangeValue(e) {
      const value = e.target.value;

      this.setState(function(prevState) {
        return {
          currentPayment: {
            ...prevState.currentPayment,
            value: value
          }
        };
      });
    }
    

    getPayment(id) {
        PaymentService.get(id)
          .then(response => {
            this.setState({
                currentPayment: response.data   
            });
          }).catch(e => {
              console.error(e);
          });
    }


    deletePayment() {
        PaymentService.delete(this.state.currentPayment.id) 
          .then(response => this.setState({currentPayment: response.data}))
          .catch(e => console.error(e));
    }

    render() {
        const { currentPayment } = this.state;
        return (
            <div>
              {currentPayment ? (
                <div className="edit-form">
                  <h4>Pagamento</h4>
                  <form>
                  <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input type="text"
                      className="form-control"
                      id="name"
                      value={currentPayment.name}
                      onChange={this.onChangeName} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={currentPayment.description}
                      onChange={this.onChangeDescription} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="value">Valor</label>
                    <input
                      type="text"
                      className="form-control"
                      id="value"
                      value={currentPayment.value}
                      onChange={this.onChangeValue} />
                  </div>

            </form>            

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePayment} >
              Delete
            </button>            
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor selecione um pagamento.</p>
          </div>
        )}
        </div> 
      );
    }

}