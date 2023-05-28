const basicMiddleware2 = (handler) => {
  return async (req, res) => {
    try {
      // Write your customised validation.
      // Validating query params for example

      if (req.query.test_param_2 != "test2") {
        return res.status(401).json({
          error_code: "basicMiddleware2",
          message: "test_param must be equal to test to pass basicMiddleware",
        });
      }

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({
        error_code: "basicMiddleware2",
        message: err.message,
      });
    }
  };
};

export default basicMiddleware2;
