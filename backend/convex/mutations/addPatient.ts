import { mutation } from "../_generated/server";
import { v } from "convex/values";
import { v4 as uuidv4 } from "uuid";

export const addPatient = mutation({
  args: {
    name: v.string(),
    age: v.number(),
    medicalCondition: v.string(),
  },
  handler: async ({ db }, { name, age, medicalCondition }) => {
    const id = uuidv4();

    await db.insert("patients", {
      _id: id,
      name,
      age,
      medicalCondition,
      createdAt: new Date().toISOString(),
    });

    return { id };
  },
});
