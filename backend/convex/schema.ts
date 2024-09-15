import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  patients: defineTable({
    id: v.id("string"),
    name: v.string(), 
    age: v.int64(), 
    medicalCondition: v.string(),
    createdAt: v.string(), 
  }),
  song_generations: defineTable({
    id: v.id("string"),
    patientId: v.optional(v.id("string")),
    medicalCondition: v.string(),
    status: v.string(),
    audioUrl: v.optional(v.string()), 
    videoUrl: v.optional(v.string()), 
    title: v.optional(v.string()),
    updatedAt: v.optional(v.string()), 
  }),
});
