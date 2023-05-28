// Sample API to generate JWT token for Authentication.
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;
const handler = async (req, res) => {
  try {
    const { method } = req;
    switch (method) {
      case "POST": {
        // Create you data object by performing any operations such as fetch data from db.
        // For this article we will harcode our data.
        const data = {
          name: "BUNNYFIEDLABS",
          email: "info@bunnyfiedlabs.com",
          website: "bunnyfiedlabs.com",
        };
        // Define the time of your token.
        // You can modify this according to your need.
        const time = {
          expiresIn: 3000, // 50min
        };
        // Create your token using data, secret and time.
        const token = jwt.sign(data, jwtSecretKey, time);
        // Return the token
        res.status(200).send(token);
        break;
      }
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(400).json({
      error_code: "api_one",
      message: err.message,
    });
  }
};

export default handler;
