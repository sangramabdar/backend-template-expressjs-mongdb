import { hash, compare, genSalt } from "bcryptjs";
import { Request } from "express";
import { getUserByEmail, saveUser } from "./auth.repository";
import { EmailExists, NotRegistered, BadRequest } from "../../utils/exceptions";
import { generateAccessToken } from "../../utils/jwt";

async function signUpService(req: Request) {
  try {
    let { email, password } = req.body;

    let user = await getUserByEmail(email);

    if (user) return [null, new EmailExists()];

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    let result = await saveUser({ ...req.body, password: hashPassword });

    return [result, null];
  } catch (error) {
    return [null, error];
  }
}

async function loginService(req: Request) {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return [null, new NotRegistered()];
    }

    const isMatched = await compare(password, user.password);

    if (!isMatched) {
      return [null, new BadRequest("password is not matched")];
    }

    const accessToken = await generateAccessToken(
      {
        _id: user._id,
        email: user.email,
      },
      "24h"
    );

    return [
      {
        _id: user._id,
        email: user.email,
        accessToken,
      },
      null,
    ];
  } catch (error) {
    return [null, error];
  }
}

export { signUpService, loginService };
