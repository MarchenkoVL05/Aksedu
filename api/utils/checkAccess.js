export default (req, res, next) => {
  try {
    if (req.userInfo.approved == true) {
      next();
    } else {
      res.status(400).json({
        message: "Вас ещё не допустили к урокам",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при проверке допуска пользователя",
    });
  }
};
