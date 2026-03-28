// error printer without suspending program
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// async wrapper
export const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};