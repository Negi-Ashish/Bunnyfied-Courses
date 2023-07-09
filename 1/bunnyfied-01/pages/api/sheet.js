import { fetch_interns } from "../../service/dbService";
import { fetch_interns_sheet } from "../../service/googleSheetService";
//--------------------------------------------------------------------------
// export default function handler(req, res) {
//   try {
//     const client = new google.auth.JWT(
//       keys.client_email,
//       null,
//       keys.private_key,
//       ["https://www.googleapis.com/auth/spreadsheets"]
//     );

//     client.authorize(async function (err, tokens) {
//       if (err) {
//         return res.status(400).send(JSON.stringify({ error: true }));
//       }

//       const gsapi = google.sheets({ version: "v4", auth: client });

//       // Range & spreadsheetId should be given by user
//       const opt = {
//         spreadsheetId: "1_0bWDrpNQWM9xg-TOkYfkGk79-yBf9KJGSXjVSAP1Xs",
//         range: "Sheet1!B2:B",
//       };

//       let data = await gsapi.spreadsheets.values.get(opt);

//       let db_users = await fetch_interns();

//       console.log("db_users", db_users);
//       return res
//         .status(200)
//         .send(JSON.stringify({ error: false, data: data.data.values }));
//     });
//   } catch (e) {
//     return res
//       .status(400)
//       .send(JSON.stringify({ error: true, message: e.message }));
//   }
// }

const handler = async (req, res) => {
  try {
    const { method } = req;
    switch (method) {
      case "GET": {
        const emails = await fetch_interns_sheet();

        res.status(200).send(JSON.stringify({ error: false, data: emails }));
        break;
      }
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (e) {
    res.status(400).json({
      error_code: "sheet",
      message: e.message,
    });
  }
};

export default handler;
