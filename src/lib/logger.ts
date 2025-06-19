import Pino, { type Logger, type LoggerOptions, stdSerializers } from 'pino';
import { z } from 'zod';

export const LOG_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal', 'audit'] as const;

export const ZLogLevel = z.enum(LOG_LEVELS);

export type TLogLevel = z.infer<typeof ZLogLevel>;

const IS_PRODUCTION = !process.env.NODE_ENV || process.env.NODE_ENV === 'production';
const IS_BUILD = process.env.NEXT_PHASE === 'phase-production-build';

const getLogLevel = (): TLogLevel => {
  let logLevel: TLogLevel = 'info';

  if (IS_PRODUCTION) logLevel = 'warn';
  if (IS_BUILD) logLevel = 'error'; // Only show errors during build

  const envLogLevel = process.env.LOG_LEVEL;
  const logLevelResult = ZLogLevel.safeParse(envLogLevel);
  if (logLevelResult.success) logLevel = logLevelResult.data;

  return logLevel;
};

const baseLoggerConfig: LoggerOptions = {
  level: getLogLevel(),
  serializers: {
    err: stdSerializers.err,
    req: stdSerializers.req,
    res: stdSerializers.res,
  },
  customLevels: {
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
    audit: 90,
  },
  useOnlyCustomLevels: true,
  timestamp: true,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  name: 'kiji',
};

const developmentConfig: LoggerOptions = {
  ...baseLoggerConfig,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname,ip,requestId',
      customLevels: 'trace:10,debug:20,info:30,audit:35,warn:40,error:50,fatal:60',
      useOnlyCustomProps: true,
    },
  },
};

const productionConfig: LoggerOptions = {
  ...baseLoggerConfig,
};

export const logger: Logger = IS_PRODUCTION ? Pino(productionConfig) : Pino(developmentConfig);

const handleShutdown = (event: string, err?: Error): void => {
  if (err) {
    logger.error(err, `Error during shutdown (${event})`);
  }
  logger.info({ event }, 'Process is exiting');

  // 非同期ではログを一旦バッファに溜めて、一定量溜まったら出力する動きをすることがある。
  // 溜まっているログを吐き出す。
  logger.flush();
};

// Create a separate function for attaching Node.js process handlers
const attachNodeProcessHandlers = (): void => {
  // Only attach handlers if we're in a Node.js environment with full process support
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    process.on('uncaughtException', (err) => {
      handleShutdown('uncaughtException', err);
    });
    process.on('unhandledRejection', (err) => {
      handleShutdown('unhandledRejection', err as Error);
    });
    process.on('SIGTERM', () => {
      handleShutdown('SIGTERM');
    });
    process.on('SIGINT', () => {
      handleShutdown('SIGINT');
    });
  }
};

if (process.env.NEXT_RUNTIME === 'nodejs') {
  try {
    attachNodeProcessHandlers();
  } catch (e) {
    logger.error(e, 'Error attaching process event handlers');
  }
}
