import { google } from "googleapis";
import keys from "../key.json";

export async function fetch_interns_sheet() {
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  return new Promise((resolve, reject) => {
    client.authorize((err, tokens) => {
      if (err) {
        reject(err);
        return;
      }

      const gsapi = google.sheets({ version: "v4", auth: client });

      const opt = {
        spreadsheetId: "1_0bWDrpNQWM9xg-TOkYfkGk79-yBf9KJGSXjVSAP1Xs",
        range: "Sheet1!B2:B",
      };

      gsapi.spreadsheets.values.get(opt, (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        const data = res.data.values;
        resolve(data);
      });
    });
  });
}
