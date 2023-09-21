import mongoose from "../utils/db.js";

const logInSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const logInCollection = mongoose.model("Users", logInSchema);

export default logInCollection;
