import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginShema, registerSchema } from "../schemas";
import { setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import { createAppwriteClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";


const app = new Hono()
.post("/login", zValidator("json", loginShema), async (c) => {
    const {email, password} = c.req.valid("json");

    const { account } = await createAppwriteClient();
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    console.log("Email:", email);
    console.log("Password:", password);
    return c.json({ message: "Login successful" });
})
.post("/register", zValidator("json", registerSchema), async (c) => {
    const {name, email, password} = c.req.valid("json");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    const { account } = await createAppwriteClient();
    const user = await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return c.json({ data: user });
})

export default app;