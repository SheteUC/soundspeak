import { mutation } from "../_generated/server";
import axios from "axios";
import { v } from "convex/values";

export const generateSong = mutation({
  args: {
    patientId: v.id("patients"),
    medicalCondition: v.string(),
  },
  handler: async ({ db }, { patientId, medicalCondition }) => {

    const patient = await db.get(patientId);
    if (!patient) {
      throw new Error("Patient not found");
    }

    const gptDescriptionPrompt = `Create a song suitable for a child with ${medicalCondition} to help improve their speech articulation. The song should be engaging, encouraging, and tailored to the child's specific needs.`;

    const payload = {
      prompt: "",
      gpt_description_prompt: gptDescriptionPrompt,
      tags: "children pop",
      mv: "chirp-v3-5",
    };

    try {
      const response = await axios.post(
        "https://studio-api.suno.ai/api/external/generate/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${process.env.SUNO_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { id } = response.data;

      await db.insert("song_generations", {
        _id: id, 
        patientId,
        medicalCondition,
        status: "submitted",
        createdAt: new Date().toISOString(),
      });

      return { id };
    } catch (error) {
      console.error("Error generating song with Suno:", error.response?.data || error.message);
      throw new Error("Failed to generate song");
    }
  },
});
