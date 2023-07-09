import { interns } from "../database/models";

//--------------------------------------------------------------------------
export async function fetch_interns() {
  const users = await interns.findAll();
  console.log("fetch_interns", users);
  return users;
}
