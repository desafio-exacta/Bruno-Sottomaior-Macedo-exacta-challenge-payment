import React, { Component } from 'react';
import PaymentService from '../services/payment.service';

export default class AddPayment extends Component{

    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);

        this.savePayment = this.savePayment.bind(this);
        this.newPayment = this.newPayment.bind(this);
    

        this.state = {
          id: null,
          name: "",
          description: "",
          value: 0,
          data: new Date(),
          tags: "",

          submited: false
        }
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeTags(e) {
      this.setState({
        tags: e.target.value
      })
    }

    onChangeValue(e) {
      this.setState({
        value: e.target.value
      });
    }

    onChangeData(e) {
      this.setState({
        data: e.target.value
      })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    formatData(current_datetime) {
      let formatted_date = '';
      if (current_datetime) {
        const data = new Date(current_datetime);
        formatted_date = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
      }
      return formatted_date;
    }

    savePayment(){
        let data = {
            name: this.state.name,
            description: this.state.description,
            value: this.state.value,
            date: new Date(this.state.data),
            tags: this.state.tags
        }
    
    
        PaymentService.create(data)
          .then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.userName,
                description: response.data.description,
                value: response.data.value,
                data: response.data.date,
                tags: response.data.tags,

                submited: true
            });
        }).catch(e => {
            console.error(e);
        });    
    }

    newPayment() {
        this.setState({
            id: null,
            name: "",
            description: "",
            value: 0,
            data: new Date(),
            tags: "",

            submited: false
        });
    }

    render() {
      return (
      <div className="submit-form">
        {this.state.submitted ? (
        <div>
          <h4>Pagamento registrado com sucesso!</h4>
          <button className="btn btn-success" onClick={this.newPayment}>
              Adicionar
            </button>
        </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description" />
            </div>

            <div className="form-group">
              <label htmlFor="value">Valor</label>
              <input type="text"
                className="form-control"
                id="value"
                required
                value={this.state.value}
                onChange={this.onChangeValue}
                name="value" />
            </div>

            <div className="form-group">
              <label htmlFor="data">Data</label>
              <input type="date"
                className="form-control"
                id="data"
                required
                value={this.state.data}
                onChange={this.onChangeData}
                name="data" />
            </div>           

            <div className="form-group">
              <label htmlFor="tags">Tags</label>
              <input type="text"
                className="form-control"
                id="tags"
                required
                value={this.state.tags}
                onChange={this.onChangeTags}
                name="tags" />
            </div>
             

            <button onClick={this.savePayment} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
        </div>   
      );
    };
    
 

}