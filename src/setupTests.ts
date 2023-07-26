import { jwtSign } from "./helpers/jwt.helper";

export const jwt = jwtSign({ id: 1, username: "john.doe@mail.com", status: "active"});