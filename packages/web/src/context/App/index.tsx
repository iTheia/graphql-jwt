import React, { createContext, useState } from 'react';
import { IAppContext } from './types';

export const AppContext = createContext<IAppContext>({
	isLoading: false,
	setIsLoading: () => null,
	errorLoading: false,
	setErrorLoading: () => null,
});

export const AppProvider: React.FC = ({ children }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorLoading, setErrorLoading] = useState(false);

	return (
		<AppContext.Provider
			value={{ isLoading, setIsLoading, errorLoading, setErrorLoading }}
		>
			{children}
		</AppContext.Provider>
	);
};
