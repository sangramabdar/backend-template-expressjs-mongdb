import mongoose from "mongoose";

async function initializeDatabase() {
  await mongoose.connect(process.env.DB_URL);
}

export default initializeDatabase;
