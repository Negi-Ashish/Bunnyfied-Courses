import { fetch_interns } from "./dbService";
import { fetch_interns_sheet } from "./googleSheetService";
import { bulk_insert } from "./dbService";
//--------------------------------------------------------------------------
export async function fetch_google_write_db() {
  let SpreadSheetID = "1_0bWDrpNQWM9xg-TOkYfkGk79-yBf9KJGSXjVSAP1Xs";
  let insert_interns = [];
  // Email Range
  let Range_emails = "Sheet1!B2:B";
  const emails = await fetch_interns_sheet(SpreadSheetID, Range_emails);

  // Name Range
  let Range_names = "Sheet1!A2:A";
  const names = await fetch_interns_sheet(SpreadSheetID, Range_names);

  // Phone Range
  let Range_phone = "Sheet1!G2:G";
  const phone = await fetch_interns_sheet(SpreadSheetID, Range_phone);

  const length = emails.length; // Assuming emails, names, and phone have the same length

  for (let i = 0; i < length; i++) {
    const email = emails[i];
    const name = names[i];
    const phoneNumber = phone[i];

    // console.log(`Index: ${i}`);
    // console.log(`Email: ${email}`);
    // console.log(`Name: ${name}`);
    // console.log(`Phone: ${phoneNumber}`);

    insert_interns.push({
      Name: `${name}`,
      Email: `${email}`,
      Phone: `${phoneNumber}`,
    });
  }
  await bulk_insert(insert_interns);
  //   console.log(insert_interns);

  return emails;
}
