import React, { createContext, useState, useEffect } from 'react';
import { IAppContext } from './types';
import { setToken, url } from '../../services/variables';

export const AppContext = createContext<IAppContext>({
	isLoading: false,
	setIsLoading: () => null,
});

export const AppProvider: React.FC = ({ children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		setIsLoading(true);
		fetch(`${url}/auth/refresh`, {
			method: 'POST',
			credentials: 'include',
		})
			.then(async (response) => {
				try {
					const { accessToken } = await response.json();
					setToken(accessToken);
					setIsLoading(false);
				} catch (error) {
					console.log(error);
					setIsLoading(false);
				}
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<AppContext.Provider value={{ isLoading, setIsLoading }}>
			{children}
		</AppContext.Provider>
	);
};
