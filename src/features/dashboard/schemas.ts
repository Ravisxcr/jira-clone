import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  key: z.string().min(1, "Project key is required"),
  description: z.string().optional(),
  status: z.enum(["Not Started", "In Progress", "Completed"]),
  progress: z.number().min(0).max(100),
  category: z.string(),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z.string(), // you can refine this to date if needed
});