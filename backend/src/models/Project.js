import mongoose, { mongo } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          // required: true,
          default: null, // allow non-registered users
        },
        email: {
          type: String,
          required: true,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["member", "admin"],
          default: "member",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema)