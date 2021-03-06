import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';

export class LoginForm extends React.Component {
	onSubmit(values) {
		return this.props.dispatch(login(values.username, values.password));
	}

	render() {
		let error;
		
		if (this.props.error) {
			error = (
				<div className="form-error" aria-live="polite">
						{this.props.error}
				</div>
			);
		}

		return (
			<form id="logIn" className="login-form" aria-label="Login form" aria-live="assertive"
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
				{error}
				<Field
					component={Input}
					type="text"
					name="username"
					id="username"
					validate={[required, nonEmpty]}
					label="Username"
				/>
				<Field
					component={Input}
					type="password"
					name="password"
					id="password"
					validate={[required, nonEmpty]}
					label="Password"
				/>
				<button disabled={this.props.pristine || this.props.submitting} aria-label="Login">
					Login
				</button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
