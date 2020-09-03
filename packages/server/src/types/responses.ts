import { ObjectType, Field } from 'type-graphql';
import { User } from '../entity/User';

@ObjectType()
export class Response {
	@Field()
	error: false;
}

@ObjectType()
export class ErrorResponse {
	@Field()
	error: true;

	@Field()
	message: string;
}

@ObjectType()
export class LoginResponse extends Response {
	@Field()
	accessToken: string;
}

@ObjectType()
export class UsersResponse extends Response {
	@Field(() => [User])
	users: User[];
}
