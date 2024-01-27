export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    name: err.name,
    message: err.message,
    success: false,
  });
};

export const notfoundHandler = (req, res, next) => {
  let error = new Error(`${req.originalUrl} Invalid URL`);
  error.statusCode = 404;
  next(error);
};

export class CustomErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
