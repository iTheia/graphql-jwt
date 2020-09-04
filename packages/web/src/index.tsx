import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { Providers } from './context';
import { apolloClient } from './services';

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={apolloClient}>
			<Providers />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
