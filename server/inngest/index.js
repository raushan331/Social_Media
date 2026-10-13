import { Inngest } from "inngest";
import User from "../models/User.js";
import connectDB from "../configs/db.js";

export const inngest = new Inngest({ id: "social2729" });

const getFullName = (first_name, last_name) =>
  [first_name, last_name].filter(Boolean).join(" ");

// User create
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk", triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const email = email_addresses[0].email_address;
    let username = email.split("@")[0];

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      username = username + Math.floor(Math.random() * 1000);
    }

    const userData = {
      _id: id,
      email,
      full_name: getFullName(first_name, last_name),
      profile_picture: image_url,
      username,
    };

    await User.create(userData);
  },
);

// User update
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk", triggers: [{ event: "clerk/user.updated" }] },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const updatedUserData = {
      email: email_addresses[0].email_address,
      full_name: getFullName(first_name, last_name),
      profile_picture: image_url,
    };

    await User.findByIdAndUpdate(id, updatedUserData);
  },
);

// User delete
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk", triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    await User.findByIdAndDelete(id);
  },
);

export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];
