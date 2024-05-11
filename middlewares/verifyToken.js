import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;
  if (!token) {
    return res.status(401).send("Unauthorized: Token Needed");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      httpOnly: true,
      maxAge: 900000,
    });
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie("access_token");
    return res.status(401).send("Unauthorized: Invalid Token");
  }
};

export default verifyToken;
