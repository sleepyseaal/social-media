class AppError extends Error {
  constructor(message, statusCode, code, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = this.constructor.name;
    this.errors = errors;
    this.seccess = false;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
