import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/Auth';
import { AuthRouter } from './auth';
import { UserRoutes } from './user';
import { AppContext } from '../context/App';
import { FullSizeLoaderComponent } from '../components/FullSizeLoader';

interface Props {}

export const Routes: React.FC<Props> = () => {
	const { currentUser } = useContext(AuthContext);
	const { isLoading } = useContext(AppContext);

	useEffect(() => {}, [currentUser]);

	if (isLoading) return <FullSizeLoaderComponent />;
	else if (currentUser === false || currentUser === null)
		return <AuthRouter />;
	else return <UserRoutes />;
};
