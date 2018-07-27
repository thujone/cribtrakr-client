import React from 'react';
import {Link} from 'react-router-dom';
import './rental-card.css';

export default class RentalCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      open: false,
      newRental: this.props.newRental
    };
  }

  onClick(e){
    e.preventDefault();
    this.setState({open: !this.state.open})
  }

  render() {
    const expenses = (
      <fieldset className="form-section">
        <legend>Expenses</legend>
        <span>Mortgage: {this.props.rental.mortgage}</span> <br/>
        <span>PMI: {this.props.rental.pmi}</span><br/>
        <span>Insurance: {this.props.rental.insurance}</span><br/> 
        <span>Property Tax: {this.props.rental.propertyTax}</span> <br/>
        <span>HOA Fees: {this.props.rental.hoa}</span> <br/>
        <span>Management Fees: {this.props.rental.managementFees}</span><br/>
        <span>Miscellaneous: {this.props.rental.misc}</span><br/> 
      </fieldset>
    );

    const existProperty = (
      <div>
        <p className="icons">
          <Link to={`${this.props.link}/${this.props.id}`}> <i className="fa fa-pencil" aria-hidden="true"></i></Link>
          <Link to={`delete-rental/${this.props.id}`}><i className="fa fa-times" aria-hidden="true"></i></Link>
        </p>
        { this.props.rental.imageURL ?
          <img src={this.props.rental.imageURL} alt="Property"/>
          :
          <img src={this.props.image} alt="Property"/>
        }
        <h4><b>
          <span>{this.props.rental.street}</span> <br/>
          <span>{this.props.rental.city}</span>,  
          <span> {this.props.rental.state}</span> 
          <span> {this.props.rental.zip}</span> <br/>
        </b></h4>
        <button onClick={this.onClick.bind(this)}>{ this.state.open ? 'Hide' : 'Show' } Expenses</button>
        { this.state.open && expenses }
      </div>
    );

    const newProperty = (
      <div>
        <Link to={`${this.props.link}/${this.props.id}`}><img src={this.props.image} alt="Property"/></Link>
        <h4><b>
          <span><Link to={`${this.props.link}/${this.props.id}`}>{this.props.name}</Link></span>
        </b></h4>
      </div>
    );

    return (
      <section className="property-card">
        <div className="container">
          { this.state.newRental ? newProperty : existProperty}
        </div>
      </section>
    );
  };
};

RentalCard.defaultProps = {
  rental: {},
  image: '',
  link: '',
  id: '',
  name: '',
  newRental: false
};
