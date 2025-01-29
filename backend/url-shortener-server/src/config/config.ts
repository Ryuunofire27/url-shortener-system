
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  shortenedUrlDomain: process.env.SHORTENED_URL_DOMAIN || '',
  database: {
    pg: {
      HOST: process.env.PG_HOST,
      PORT: process.env.PG_PORT,
      USER: process.env.PG_USER,
      PSSW: process.env.PG_PSSW,
      DB: process.env.PG_DB,
    },
    dynamo: {
      HOST: process.env.DYNAMO_HOST,
      PORT: parseInt(process.env.DYNAMO_PORT, 10),
      ACCESS_KEY_ID: process.env.DYNAMO_ACCESS_KEY_ID,
      SECRET_ACCESS_KEY: process.env.DYNAMO_SECRET_ACCESS_KEY,
      REGION: process.env.DYNAMO_REGION,
      SHORTENED_URL_TABLE: 'SHORTENED-URL-TABLE'
    }
  },
  cache: {
    redis: {
      url: 'redis://localhost:6379'
    }
  }
});
