import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { Link } from 'react-router-dom';
import { updateExpense, fetchExpense } from '../actions/expenses';
import './dashboard.css';
import Input from './input';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {Categories} from '../data';
import Textarea from './textarea';
import {required, nonEmpty, isTrimmed, isCurrency} from '../validators';


export class EditExpenseForm extends React.Component {
  
  onSubmit(values) {
    const expenseId = this.props.initialValues.id
    const username = this.props.username;
    const expense = Object.assign({}, {user: username}, {id:expenseId}, values);
    return this.props.dispatch(updateExpense(expense))
  }

  render() {
    let categories = Categories;
    const categoriesOptions = categories.map((category, index) => 
      <option key={index} value={category.value}>{category.value}</option>
    );

    // redux form used to update rental content
    if (this.props.submitSucceeded === true ) {
      return (
        <div>
          <Redirect to={`/expenses`} />
        </div>
      )
    }  

    return (
        <div>
          <form className="edit-expense-form" id="edit-property-form" aria-label="edit expense form"
          onSubmit={this.props.handleSubmit(values => this.onSubmit(values))} >
          
          <section className="property-details">
            <label htmlFor="propertyName">Property:</label>
            <Field component="input" type="text" readOnly="true" name="propName" 
              id="propertyName" aria-label="Property:" required />
            <label htmlFor="categoryName">Category:</label>
            <Field component="select" name="category" validate={[required]} 
              id="categoryName" aria-label="Property:">{categoriesOptions}</Field>
            <label htmlFor="dateName">Date of Service: </label>
            <Field component="input" type="date" name="date" aria-label="Date of Service:" 
              id="dateName" validate={[required]} />
            <Field component={Input} type="text" name="amount" label="Expense:" 
              validate={[required, nonEmpty, isTrimmed, isCurrency]} />
            <Field component={Input} type="text" name="vendor" label="Vendor:" 
              validate={[required, nonEmpty, isTrimmed]} />
            <Field component={Textarea} type="text" name="description" label="Description:" 
              validate={[required, nonEmpty, isTrimmed]} />
          </section>
          <div>
            <button type="submit" disabled={this.props.pristine || this.props.submitting} >
              Save Changes
            </button>
            <Link to="/expenses"><button type="button">Back</button></Link>
          </div>
        </form>
      </div>
    );
  }
}

EditExpenseForm = reduxForm({
    form: "editExpense",
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('editExpense', Object.keys(errors)[0]))
})(EditExpenseForm);

EditExpenseForm = connect(
  state => ({ initialValues: state.expense.currentExpense }),
  { load: fetchExpense }
)(EditExpenseForm);

export default EditExpenseForm;