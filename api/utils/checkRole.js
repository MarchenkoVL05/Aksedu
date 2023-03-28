export default (req, res, next) => {
  try {
    if (req.userInfo.role === "ADMIN") {
      next();
    } else {
      return res.status(500).json({
        message: "Нужно обладать правами администратора",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при проверке прав пользователя",
    });
  }
};
