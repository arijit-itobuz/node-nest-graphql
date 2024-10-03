import 'dotenv/config';

export const config = {
  app: {
    env: process.env.APP_ENV ?? '',
    port: process.env.PORT ?? '',
  },

  db: {
    url: process.env.DATABASE_URL ?? '',
  },

  jwt: {
    access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET ?? '',
    refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET ?? '',
    verify_token_secret: process.env.JWT_VERIFY_TOKEN_SECRET ?? '',
    forgot_password_token_secret: process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET ?? '',
  },

  smtp: {
    host: process.env.SMTP_HOST ?? '',
    port: Number(process.env.SMTP_PORT) ?? 0,
    username: process.env.SMTP_USERNAME ?? '',
    password: process.env.SMTP_PASSWORD ?? '',
  },

  email: {
    from: process.env.EMAIL_FROM ?? '',
  },

  auth: {
    passwordHashSalt: 10,
    failedLoginCount: 5,
    accountLockedTimeInMins: 15,

    mfaTokenExpiryTime: 10, // in mins
    verifyTokenExpiryTime: 10, // in mins
    forgotPasswordTokenExpiryTime: 10, // in mins
    accessTokenExpiryTime: 1, // in hrs
    refreshTokenExpiryTime: 30, // in days
  },
};
