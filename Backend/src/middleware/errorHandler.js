export class AppError extends Error {
  constructor(message, statusCode = 500, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isDev = process.env.NODE_ENV === 'development';

  console.error(
    `[${new Date().toISOString()}] ${statusCode} ${err.message}`,
    isDev ? err.stack : ''
  );

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(err.data && { data: err.data }),
    ...(isDev && { stack: err.stack }),
  });
};
