import { dev } from './dev';
import { prod } from './prod';

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

export let config = {
	port: 0,
	accessToken: '',
	refreshToken: '',
};
const env = process.env.NODE_ENV;

switch (env) {
	case 'development':
	case 'dev':
		config = dev;
		break;
	case 'prod':
	case 'production':
		config = prod;
		break;
	default:
		config = dev;
		break;
}
