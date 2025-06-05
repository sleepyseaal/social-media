module.exports = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_ERROR";

  const isProduction = process.env.NODE_ENV === "production";
  const message = isProduction
    ? statusCode === 500
      ? "Internal Server Error"
      : err.message
    : err.message;

  res.status(statusCode).json({
    success: false,
    code,
    message,
  });
};
