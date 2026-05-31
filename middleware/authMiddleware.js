const jwt = require("jsonwebtoken");

const SECRET = "MY_SECRET_KEY";

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET);

    req.user = decoded.id;

    next();

  } catch (err) {
    console.log(err.message);

    return res.status(401).json({
      message: "Token invalid",
    });
  }
};

module.exports = protect;