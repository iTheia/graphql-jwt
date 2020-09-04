export interface IAuthContext {
	currentUser: IUser | null | false;
}
export interface IUser {
	id: string;
}
