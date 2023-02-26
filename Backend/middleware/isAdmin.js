const isAdmin = async (req, res, next) => {
  if (
    req.user.password ==
      "$2b$10$MwNKeUhU1PIvOAYUDdA2muJAPFvs/blWy6gJz.lkI0zmMQkkcRF3y" &&
    req.user.email == "adminsephora@gmail.com" &&
    req.user._id == "63e777b16267f2962127fd72"
  ) {
    next();
  } else res.status(401).json({ error: "You are not verified as an admin" });
};
module.exports = isAdmin;

