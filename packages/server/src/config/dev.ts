export const dev = {
	port: parseInt(`${process.env.DEV_PORT}`) || 5000,
	accessToken: process.env.DEV_ACCESS_TOKEN || "ASDASD2131l=']'qwe",
	refreshToken: process.env.DEV_REFRESH_TOKEN || "ASD][;d123213''as",
};
