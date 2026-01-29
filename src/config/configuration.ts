export default () => ({
  port: Number(process.env.SERVER_PORT),
  jwtSecret: process.env.JWT_SECRET,
  db: {
    url: process.env.DATABASE_URI as string
  },
  enviroment: process.env.NODE_ENV as string
});