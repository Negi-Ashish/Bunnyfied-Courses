const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;
const authMiddleware = (handler) => {
  return async (req, res) => {
    try {
      // Get the token from header
      const authorizationToken = req.headers.authorization;
      // Validate the token
      if (authorizationToken) {
        // If the token is expired jwt.verify will throw a error
        const data = jwt.verify(authorizationToken, jwtSecretKey);
        // Attaching the authenticated data to the request object
        req.auth_data = data;
        return handler(req, res);
      }
      // Token has been expired or we detected a fruad attack
      res.status(401).json({
        error: "Unauthorized",
        message: "Not allowed.",
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        error: "Unauthorized Error",
        message: "Not allowed.",
      });
    }
  };
};
export default authMiddleware;
