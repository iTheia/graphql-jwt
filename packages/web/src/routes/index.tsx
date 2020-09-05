import React, { useContext, useEffect } from 'react';
import { AuthRouter } from './auth';
import { UserRoutes } from './user';
import { FullSizeLoaderComponent } from '../components/FullSizeLoader';
import { useMyProfileQuery } from '../generated';

interface Props {}

export const Routes: React.FC<Props> = () => {
	const { data, loading } = useMyProfileQuery();

	useEffect(() => {
		console.log(data);
	}, [data?.myProfile]);

	if (loading) return <FullSizeLoaderComponent />;
	if (data?.myProfile === null) return <AuthRouter />;
	else return <UserRoutes />;
};
