const basicMiddleware = (handler) => {
  return async (req, res) => {
    try {
      // Convert string from Front end to Json
      if (req.body) {
        req.body = JSON.parse(req.body);
      }

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({
        error_code: "basicMiddleware",
        message: err.message,
      });
    }
  };
};

export default basicMiddleware;
