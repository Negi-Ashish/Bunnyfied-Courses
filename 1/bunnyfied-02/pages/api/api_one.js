import {
  create_medium_user,
  fetch_medium_users,
} from "../../service/dbService";

import basicMiddleware from "../../middleware/basicMiddleware";

const handler = async (req, res) => {
  try {
    const { method } = req;
    switch (method) {
      case "POST": {
        const created_user = await create_medium_user(req.body);
        res.status(200).json(created_user);
        break;
      }
      case "GET": {
        //Do some thing
        const all_users = await fetch_medium_users();
        res.status(200).json(all_users);
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

export default basicMiddleware(handler);
