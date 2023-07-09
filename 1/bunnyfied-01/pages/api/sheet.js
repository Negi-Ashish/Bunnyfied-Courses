import { google } from "googleapis";
import keys from "../../key.json";

import { interns } from "../../database/models";

//--------------------------------------------------------------------------
async function fetch_interns() {
  console.log("called");
  const users = await interns.findAll();
  console.log("called", users);
  return users;
}
//--------------------------------------------------------------------------
export default function handler(req, res) {
  try {
    const client = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    client.authorize(async function (err, tokens) {
      if (err) {
        return res.status(400).send(JSON.stringify({ error: true }));
      }

      const gsapi = google.sheets({ version: "v4", auth: client });

      // Range & spreadsheetId should be given by user
      const opt = {
        spreadsheetId: "1_0bWDrpNQWM9xg-TOkYfkGk79-yBf9KJGSXjVSAP1Xs",
        range: "Sheet1!B2:B",
      };

      let data = await gsapi.spreadsheets.values.get(opt);

      let db_users = await fetch_interns();

      console.log("db_users", db_users);
      return res
        .status(400)
        .send(JSON.stringify({ error: false, data: data.data.values }));
    });
  } catch (e) {
    console.log("ERROR", e);
    return res
      .status(400)
      .send(JSON.stringify({ error: true, message: e.message }));
  }
}
