import React from 'react';
import { Routes } from '../routes';
import { AppProvider } from './App';
import { AuthProvider } from './Auth';

export const Providers: React.FC = () => (
	<AppProvider>
		<AuthProvider>
			<Routes />
		</AuthProvider>
	</AppProvider>
);
