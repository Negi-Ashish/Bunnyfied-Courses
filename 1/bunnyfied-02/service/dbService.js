import { medium_users } from "../database/models";
// ----------------------------------------------------------------
export async function create_medium_user({ firstName, lastName, status }) {
  const users = await medium_users.create({
    firstName: firstName,
    lastName: lastName,
    status: status,
  });
  return users.dataValues;
}

//--------------------------------------------------------------------------
export async function fetch_medium_users() {
  const users = await medium_users.findAll();
  return users;
}
