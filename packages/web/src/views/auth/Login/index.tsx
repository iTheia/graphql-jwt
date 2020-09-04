import React, { Fragment } from 'react';
import { Formik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import {
	useLoginMutation,
	MyProfileQuery,
	MyProfileDocument,
} from '../../../generated';
import { setToken } from '../../../services/variables';
import { RouteComponentProps } from 'react-router-dom';

export const LoginPage: React.FC<RouteComponentProps> = ({ history }) => {
	const [login] = useLoginMutation();

	const submit = async (variables: any) => {
		try {
			const response = await login({
				variables,
				update: (store, { data }) => {
					if (!data) {
						return null;
					}
					store.writeQuery<MyProfileQuery>({
						query: MyProfileDocument,
						data: {
							myProfile: {
								name: '',
							},
						},
					});
				},
			});

			console.log(response);

			if (response && response.data) {
				setToken(response.data.login.accessToken);
			}
			history.push('/');
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Fragment>
			<Formik
				initialValues={{
					email: 'martinez.ded@gmail.com',
					password: 'manga123',
				}}
				onSubmit={submit}
			>
				{({
					handleSubmit,
					touched,
					values,
					errors,
					handleChange,
					isSubmitting,
				}) => (
					<div>
						<TextField
							onChange={handleChange('email')}
							label="Email"
							value={values.email}
						/>
						<TextField
							onChange={handleChange('password')}
							label="Password"
							type="password"
							value={values.password}
						/>
						<Button
							color="primary"
							disabled={isSubmitting}
							onClick={handleSubmit as any}
						>
							Submit
						</Button>
					</div>
				)}
			</Formik>
		</Fragment>
	);
};
