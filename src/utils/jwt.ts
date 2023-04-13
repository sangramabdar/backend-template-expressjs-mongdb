import jwt from "jsonwebtoken";

async function generateAccessToken(payload: any, expiresIn: string = "") {
  let accessToken;
  if (expiresIn == "") {
    accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_KEY);
  } else {
    accessToken = await jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn,
    });
  }

  return accessToken;
}

async function verifyAccessToken(token: string): Promise<jwt.JwtPayload> {
  const data = await jwt.verify(token, process.env.JWT_ACCESS_KEY);
  delete data.iat;
  delete data.exp;
  return data;
}

export { verifyAccessToken, generateAccessToken };
