import cors from 'cors';
import express from 'express';
import logger from 'pino-http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { initializeDb } from '@/__mocks__/db';
import { env } from '@/__mocks__/env';
import { handlers } from '@/__mocks__/handlers';

const app = express();

app.use(
  cors({
    origin: env.APP_URL,
    credentials: true,
  }),
);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.json());
app.use(
  logger({
    level: 'info',
    redact: ['req.headers', 'res.headers'],
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: true,
      },
    },
  }),
);

app.use(handlers);

initializeDb().then(() => {
  console.log('Mock DB initialized');
  app.listen(env.APP_MOCK_API_PORT, () => {
    console.log(
      `Mock API server started at http://localhost:${env.APP_MOCK_API_PORT}`,
    );
  });
});