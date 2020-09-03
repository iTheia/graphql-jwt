import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import { User } from '../entity/User';
import { hash, compare } from 'bcryptjs';
import { LoginResponse, ErrorResponse } from '../types/responses';
import { MyContext } from '../types/context';
import {
	createAccessToken,
	createRefreshToken,
	sendRefreshToken,
} from '../middlewares';

@Resolver()
export class UserResolver {
	@Query(() => String)
	hello() {
		return 'hello';
	}

	@Mutation(() => LoginResponse)
	async login(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Ctx() { res }: MyContext
	): Promise<LoginResponse | ErrorResponse> {
		try {
			const user = await User.findOne({ email });
			if (!user) {
				throw new Error('invalid login');
			}
			const validPassword = await compare(password, user.password);
			if (!validPassword) {
				throw new Error('invalid login');
			}

			sendRefreshToken(res, createRefreshToken(user));
			return {
				accessToken: createAccessToken(user),
				error: false,
			};
		} catch (e) {
			if (e instanceof Error) {
				return {
					error: true,
					message: e.message,
				};
			}
			return {
				error: true,
				message: e,
			};
		}
	}
	@Mutation(() => Boolean)
	async register(
		@Arg('email', () => String) email: string,
		@Arg('userName', () => String) userName: string,
		@Arg('password', () => String) password: string,
		@Arg('name', () => String) name: string
	) {
		try {
			const hashedPassword = await hash(password, 12);
			await User.insert({
				email,
				userName,
				name,
				password: hashedPassword,
			});
			return true;
		} catch (error) {
			return false;
		}
	}
}
