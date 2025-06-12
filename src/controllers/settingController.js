const prisma = require("../config/prisma");

async function getLogInHistory(req, res, next) {
  try {
    const logInHistory = await prisma.loginHistory.findMany({
      select: {
        browser: true,
        os: true,
        device: true,
        ip: true,
        createdAt: true,
      },
    });
    res.json({
      success: true,
      message: "Log in history fetched successfully",
      data: logInHistory,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getLogInHistory };
