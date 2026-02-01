export default () => ({
  server: {
    port: Number(process.env.SERVER_PORT),
    prefix: process.env.PREFIX as string,
    version: process.env.VERSION,
  },
  jwtSecret: process.env.JWT_SECRET,
  db: {
    url: process.env.DATABASE_URI as string
  },
  environment: process.env.NODE_ENV as string,
  swagger: {
    apiUri: process.env.API_URI as string || `http://127.0.0.1:4001`,
  },
  cors: {
    urlDev: process.env.CLIENT_URL_DEV as string || `http://127.0.0.1:4000`,
    urlPro: process.env.CLIENT_URL_PRO as string || `http://127.0.0.1:4000`
  },
  jwt: {
    secretKey: process.env.SECRET_KEY as string,
    aesKey: process.env.AES_KEY as string,
    accessExpiresTime: process.env.ACCESS_EXPIRES_TIME || '10m',
    refreshExpiresTime: process.env.REFRESH_EXPIRES_TIME || '7d',
  }
});