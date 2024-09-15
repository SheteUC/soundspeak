import { query } from "../_generated/server";

export const listPatients = query({
  handler: async ({ db }) => {
    const patients = await db.query("patients").order("desc").collect();
    return patients;
  },
});
