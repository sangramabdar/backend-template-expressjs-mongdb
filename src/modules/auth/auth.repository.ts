import UserModel from "../../models/User";

async function saveUser(user: any) {
  const userDoc = new UserModel({
    ...user,
  });

  await userDoc.save();

  return {
    _id: userDoc._id,
  };
}

async function getUserByEmail(email: string) {
  const userDoc = await UserModel.findOne({
    email,
  });

  if (!userDoc) return null;

  return userDoc;
}

export { saveUser, getUserByEmail };
