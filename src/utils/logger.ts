import path from 'path';
import fs from 'fs';

export type LogLevel = 'info' | 'warn' | 'error' | 'important';
export type LoggerFunction = (message: unknown, level?: LogLevel) => void;

const getTodayString = (): string => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

const logDir: string = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const formatMessage = (message: unknown): string => {
  if (message instanceof Error) {
    return message.stack || message.message;
  }

  if (typeof message === 'object') {
    return JSON.stringify(message, null, 2);
  }

  return String(message);
};

export const logger: LoggerFunction = (
  message: unknown,
  level: 'info' | 'warn' | 'error' | 'important' = 'info',
): void => {
  const today = getTodayString();
  const filePath = path.join(logDir, `${today}_logs.log`);
  const logLine = `[${new Date().toISOString()}] ${level.toUpperCase()}: ${formatMessage(message)}\n\n`;
  fs.appendFileSync(filePath, logLine);
};
