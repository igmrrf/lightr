export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  zego: {
    appID: process.env.ZEGO_APP_ID,
    serverID: process.env.ZEGO_SERVER_ID,
    effectTime: process.env.ZEGO_EFFECT_TIME,
    payload: process.env.ZEGO_PAYLOAD,
  },
});
