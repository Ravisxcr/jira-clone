import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route"

const app = new Hono().basePath("/api")

app.get("/hello", (c) => { 
    return c.json({ message: "Hello, World!" });
});

app.get("/project/:projectId", (c) => {
    const projectId = c.req.param('projectId');
    return c.json({ message: `Project ID: ${projectId}` });
});

export const GET = handle(app);