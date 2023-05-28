import basicMiddleware from "../../middleware/basicMiddleware";
import basicMiddleware2 from "../../middleware/basicMiddleware2";
const handler = async (req, res) => {
  try {
    const { method } = req;
    switch (method) {
      case "POST": {
        //Do some thing
        res.status(200).send("We Secured the POST API End Point");
        break;
      }
      case "GET": {
        //Do some thing
        res.status(200).send("We Secured the GET API End Point");
        break;
      }
      case "PUT": {
        //Do some thing
        res.status(200).send("We Secured the PUT API End Point");
        break;
      }
      case "DELETE": {
        //Do some thing
        res.status(200).send("We Secured the DELETE API End Point");
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
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

export default basicMiddleware(basicMiddleware2(handler));
