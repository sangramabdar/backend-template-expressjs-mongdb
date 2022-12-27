import { hash, compare, genSalt } from "bcryptjs";
import { Request } from "express";

import { getUserByEmail, saveUser } from "./auth.repository";
import { EmailExists, NotRegistered, BadRequest } from "../../utils/exceptions";

async function signUpService(req: Request) {
  let { email, password } = req.body;

  let user = await getUserByEmail(email);

  if (user) {
    throw new EmailExists();
  }

  const salt = await genSalt(10);
  const hashPassword = await hash(password, salt);

  let result = await saveUser({ ...req.body, password: hashPassword });

  return result;
}

async function loginService(req: Request) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user) {
    throw new NotRegistered();
  }

  const isMatched = await compare(password, user.password);

  if (!isMatched) {
    throw new BadRequest("password is not matched");
  }

  return {
    _id: user._id,
    email: user.email,
  };
}

export { signUpService, loginService };
