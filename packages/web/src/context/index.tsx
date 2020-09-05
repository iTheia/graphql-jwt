import React from 'react';
import { Routes } from '../routes';
import { AppProvider } from './App';

export const Providers: React.FC = () => (
	<AppProvider>
		<Routes />
	</AppProvider>
);
