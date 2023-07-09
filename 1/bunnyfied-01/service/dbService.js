import { interns } from "../database/models";

//--------------------------------------------------------------------------
export async function fetch_interns() {
  const users = await interns.findAll();
  console.log("fetch_interns", users);
  return users;
}
//--------------------------------------------------------------------------
export async function insert_interns({ Name, Email, Phone }) {
  try {
    const users = await interns.create({
      Name: Name,
      Email: Email,
      Phone: Phone,
      status: true,
    });
  } catch (e) {
    console.log(`Name: ${Name} Already in DB`, e);
    // console.log(`Email: ${Email} Already in DB`);
    // console.log(`Phone: ${Phone} Already in DB`);
  }
}
//--------------------------------------------------------------------------
export async function bulk_insert(interns) {
  let promise = [];
  const length = interns.length; // Assuming emails, names, and phone have the same length

  console.log(length);

  for (let i = 0; i < length; i++) {
    // console.log(`Email: ${interns[i].Email}`);
    // console.log(`Name: ${interns[i].Name}`);
    // console.log(`Phone: ${interns[i].Phone}`);

    let response = insert_interns(interns[i]);
    promise.push(response);
  }
  const result = await Promise.all(promise);
  return "Records Inserted";
}
