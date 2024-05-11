import jwt from "jsonwebtoken";

const getAccessToken = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username !== process.env.USER || password !== process.env.PASSWORD) {
      return res.status(401).send("Invalid Credentials");
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    res.cookie("access_token", token).sendStatus(200);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

export default getAccessToken;
