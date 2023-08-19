const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");


const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const infoTransport = new DailyRotateFile({
  filename: 'src/logs/UFO-info-%DATE%.log',
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  prepend: true,
  level: "info",
});

const errorTransport = new DailyRotateFile({
  filename: 'src/logs/UFO-error-%DATE%.log',
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  prepend: true,
  level: "error",
});

const warnTransport = new DailyRotateFile({
  filename: 'src/logs/UFO-warn-%DATE%.log',
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  prepend: true,
  level: "warn",
});

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    infoTransport,
    errorTransport,
    warnTransport,
    new winston.transports.Console({
      level: "info",
    }),
  ],
});

module.exports = logger;
