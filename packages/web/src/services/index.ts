import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	Observable,
	createHttpLink,
} from '@apollo/client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { getToken, url, setToken } from './variables';
import { decode } from 'jsonwebtoken';
import { NormalizedCacheObject } from '@apollo/react-hooks';

const requestLink = new ApolloLink(
	(operation, forward) =>
		new Observable((observer) => {
			let handle: any;
			Promise.resolve(operation)
				.then((operation) => {
					const accessToken = getToken();
					if (accessToken) {
						operation.setContext({
							headers: {
								authorization: `bearer ${accessToken}`,
							},
						});
					}
				})
				.then(() => {
					handle = forward(operation).subscribe({
						next: observer.next.bind(observer),
						error: observer.error.bind(observer),
						complete: observer.complete.bind(observer),
					});
				})
				.catch(observer.error.bind(observer));
			return () => {
				if (handle) handle.unsubscribe();
			};
		})
);

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient(
	{
		link: ApolloLink.from([
			new TokenRefreshLink({
				accessTokenField: 'accessToken',
				isTokenValidOrUndefined: () => {
					try {
						const token = getToken();
						if (!token) {
							return true;
						}
						const { exp } = decode(token) as any;
						if (Date.now() >= exp * 1000) {
							return false;
						} else {
							return true;
						}
					} catch {
						return false;
					}
				},
				fetchAccessToken: () => {
					return fetch(`${url}/refresh_token`, {
						method: 'POST',
						credentials: 'include',
					});
				},
				handleFetch: (accessToken) => {
					setToken(accessToken);
				},
				handleError: (err) => {
					console.warn(
						'Your refresh token is invalid. Try to relogin'
					);
					console.error(err);
				},
			}) as any,
			requestLink,
			createHttpLink({
				uri: `${url}/graphql`,
				credentials: 'include',
			}),
		]),
		cache: new InMemoryCache(),
	}
);
