import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
          name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            unique: true,
            required: true,
            select:false
          },
          password: {
            type: String,
            required: true,
            select:false
          },
        }
      );
      export const User = mongoose.model("Users", userSchema);