export const prod = {
	port: parseInt(`${process.env.PORT}`) || 8080,
	accessToken: process.env.ACCESS_TOKEN || "ASDASD2131l=']'qwe",
	refreshToken: process.env.REFRESH_TOKEN || "ASD][;d123213''as",
};
