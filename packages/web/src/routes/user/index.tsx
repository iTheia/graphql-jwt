import React from 'react';
import { getToken } from '../../services/variables';

interface Props {}

export const UserRoutes: React.FC<Props> = () => {
	return (
		<div>
			<button onClick={() => console.log(getToken())}>asd</button>
		</div>
	);
};
