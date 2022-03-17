export default () => ({
  env: process.env.APP_ENV,
  port: parseInt(process.env.APP_PORT, 10) || 5432,
  jwtTokenExpiry: process.env.JWT_REFRESH_TOKEN_EXP_IN_SEC,
  jwtAccessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXP_IN_SEC,
  jwtPublicKeyBase64: process.env.JWT_PUBLIC_KEY_BASE64,
  jwtPrivateKeyBase64: process.env.JWT_PRIVATE_KEY_BASE64,
});
