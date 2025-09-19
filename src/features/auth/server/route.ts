import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginShema } from "../schemas";

const app = new Hono()
.post("/login", zValidator("json", loginShema),(c) => {
    return c.json({ success: "ok"});
});

export default app;