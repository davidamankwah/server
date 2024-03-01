import mongoose from "mongoose";

// The schema for the User model
const UserSchema = new mongoose.Schema(
   {
     userName: {
        type: String,
        required: true,
        min: 5,
        max: 40,
      },
      // Email address of the user (must be unique)
      emailAddress: {
        type: String,
        required: true,
        max: 40,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 3,
      },
      // Path to the user's profile picture (default is an empty string)
      picturePath: {
        type: String,
        default: "",
      },
      // List of followers (default is an empty array)
      followers: {
        type: Array,
        default: [],
      },
      
    },
     { timestamps: true } // Add timestamps to the schema
);

// Create the User model using the UserSchema
const User = mongoose.model("User", UserSchema);

export default User;