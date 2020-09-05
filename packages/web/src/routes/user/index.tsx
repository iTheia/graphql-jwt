import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ProfilePage } from '../../views/user/Profile';

interface Props {}

export const UserRoutes: React.FC<Props> = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={ProfilePage} />
		</Switch>
	</BrowserRouter>
);
