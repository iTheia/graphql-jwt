import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage } from '../../views/auth/Login';
import { RegisterPage } from '../../views/auth/Register';
interface Props {}

export const AuthRouter: React.FC<Props> = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={LoginPage} />
				<Route path="/register" component={RegisterPage} />
				<Redirect path="*" to="/login" />
			</Switch>
		</BrowserRouter>
	);
};
