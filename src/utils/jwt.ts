import jwt from "jsonwebtoken";

async function generateAccessToken(payload: any, expiresIn: string = "") {
  let accessToken;
  if (expiresIn == "") {
    accessToken = await jwt.sign(payload, process.env.ACCESS_KEY);
  } else {
    accessToken = await jwt.sign(payload, process.env.ACCESS_KEY, {
      expiresIn,
    });
  }

  return accessToken;
}

async function generateRefreshToken(payload: any, expiresIn: string = "") {
  let refreshToken;
  if (expiresIn == "") {
    refreshToken = await jwt.sign(payload, process.env.REFRESH_KEY);
  } else {
    refreshToken = await jwt.sign(payload, process.env.REFRESH_KEY, {
      expiresIn,
    });
  }

  return refreshToken;
}

async function verifyAccessToken(token: string): Promise<jwt.JwtPayload> {
  const data = await jwt.verify(token, process.env.ACCESS_KEY);
  delete data.iat;
  delete data.exp;
  return data;
}

async function verifyRefreshToken(token: string): Promise<jwt.JwtPayload> {
  const data = await jwt.verify(token, process.env.REFRESH_KEY);
  delete data.iat;
  delete data.exp;
  return data;
}

export {
  verifyAccessToken,
  verifyRefreshToken,
  generateRefreshToken,
  generateAccessToken,
};
