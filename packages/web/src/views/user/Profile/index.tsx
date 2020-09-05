import React from 'react';
import { useMyProfileQuery, useLogoutMutation } from '../../../generated';
import { setToken } from '../../../services/variables';
import { RouteComponentProps } from 'react-router-dom';

export const ProfilePage: React.FC<RouteComponentProps> = ({ history }) => {
	const { data, loading } = useMyProfileQuery();
	const [logout, { client }] = useLogoutMutation();
	if (loading) {
		return <div>loading</div>;
	}
	console.log(data);
	return (
		<div>
			{data?.myProfile.name}

			<button
				onClick={async () => {
					try {
						await logout();
						setToken('');
						await client!.resetStore();
					} catch (error) {
						console.log(error);
					}
				}}
			>
				log out
			</button>
		</div>
	);
};
