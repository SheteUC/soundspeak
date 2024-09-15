import { query } from "../_generated/server"; 
import axios from "axios";
import { v } from "convex/values";

export const getSongStatus = query({
  args: { id: v.string() },
  handler: async ({ db }, { id }) => {
    const songGeneration = await db.get(id);
    if (!songGeneration) {
      throw new Error("Song generation request not found");
    }

    try {
      const response = await axios.get(`https://studio-api.suno.ai/api/external/clips/?ids=${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.SUNO_API_KEY}`,
        },
      });

      const clips = response.data;

      if (!clips || clips.length === 0) {
        throw new Error("No clips found for the provided ID");
      }

      const clip = clips[0];

      await db.patch(id, {
        status: clip.status,
        audioUrl: clip.audio_url || null,
        videoUrl: clip.video_url || null,
        title: clip.title || "",
        updatedAt: new Date().toISOString(),
      });

      return {
        status: clip.status,
        audioUrl: clip.audio_url || null,
        videoUrl: clip.video_url || null,
        title: clip.title || "",
      };
    } catch (error) {
      console.error("Error fetching song status from Suno:", error.response?.data || error.message);
      throw new Error("Failed to fetch song status");
    }
  },
});
