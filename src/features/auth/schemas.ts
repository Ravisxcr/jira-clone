import { z } from "zod";

export const loginShema = z.object({
    email: z.string().email(),
    password: z.string()
});

