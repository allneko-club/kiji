import cors from 'cors';
import express from 'express';
import logger from 'pino-http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { handlers } from '@/__mocks__/handlers';

const app = express();

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_URL,
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

app.listen(
  process.env.NEXT_PUBLIC_MOCK_API_PORT,
  () => console.log('Ready')
);
