import React, { createContext, useState, useEffect, useContext } from 'react';
import { decode } from 'jsonwebtoken';
import { IAuthContext, IUser } from './types';
import { AppContext } from '../App';
import { url } from '../../services/variables';

export const AuthContext = createContext<IAuthContext>({
	currentUser: null,
});

export const AuthProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<IUser | false | null>(null);
	const { setIsLoading, setErrorLoading } = useContext(AppContext);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${url}/auth/refresh`, {
			method: 'POST',
			credentials: 'include',
		})
			.then(async (response) => {
				try {
					const { accessToken } = await response.json();
					setCurrentUser(decode(accessToken) as IUser);
					setIsLoading(false);
				} catch (error) {
					setErrorLoading(true);
					setIsLoading(false);
				}
			})
			.catch((error) => console.log(error));
	}, [setIsLoading]);
	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
