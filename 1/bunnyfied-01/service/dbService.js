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
    if (e.name == "SequelizeUniqueConstraintError") {
      console.log(`Name: ${Name} Already in DB`);
    } else {
      console.log(`Error`, e);
    }
  }
}
//--------------------------------------------------------------------------
export async function bulk_insert(interns) {
  let promise = [];
  const length = interns.length; // Assuming emails, names, and phone have the same length
  for (let i = 0; i < length; i++) {
    let response = insert_interns(interns[i]);
    promise.push(response);
  }
  const result = await Promise.all(promise);
  return "Records Inserted";
}
