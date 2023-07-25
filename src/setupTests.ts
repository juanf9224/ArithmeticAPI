import { jwtSign } from "./helpers/jwt";

export const jwt = jwtSign({ id: 1, username: "john.doe@mail.com", status: "active"});