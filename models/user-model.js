const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
  cart: [
    {
      versionId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
});

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };

const MOCK_USERS = [
  {
    password: "123456789",
    email: "aviryl@gmail.com",
    name: "Lior Aviry",
    role: "admin",
    cart: [],
  },
  {
    password: "987654321",
    email: "oweil1996@gmail.com",
    name: "Or Weil",
    role: "user",
    cart: [],
  },
];

async function initDb() {
  //await UserModel.deleteMany({}).exec();
  const users = await UserModel.find();
  if (users.length === 0) {
    for (const user of MOCK_USERS) {
      const newUsers = new UserModel(user);
      await newUsers.save();
      console.log("users run");
    }
  }
}

initDb();
