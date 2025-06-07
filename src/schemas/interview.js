// schemas/interview.js
import { z } from "zod";

export const interviewSchema = z.object({
  role: z.string().min(1, "Role is required"),
  level: z.enum(["Junior", "Mid", "Senior"], {
    errorMap: () => ({ message: "Level is required" }),
  }),
  interviewType: z.enum(["Technical", "Behavioral", "Product"], {
    errorMap: () => ({ message: "Interview type is required" }),
  }),
  language: z.string().optional().default("English"),
  name: z.string().optional(),
});
