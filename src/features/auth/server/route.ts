import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginShema, registerSchema } from "../schemas";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import { createAppwriteClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";

type Variables = {
    user: any;
};

const app = new Hono<{ Variables: Variables }>()

.get("/current", sessionMiddleware, async (c) => {
    const user = c.get("user");
    return c.json({ data: user });
})
.post("/login", zValidator("json", loginShema), async (c) => {
    const { email, password } = c.req.valid("json");
    const { account } = await createAppwriteClient();
    try {
        const session = await account.createEmailPasswordSession(email, password);
        setCookie(c, AUTH_COOKIE, session.secret, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // false for dev
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
        });
        return c.json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        const errorMessage = typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : "An unknown error occurred";
        return c.json({ error: errorMessage }, 401);
    }
})
.post("/register", zValidator("json", registerSchema), async (c) => {
    const {name, email, password} = c.req.valid("json");

    const { account } = await createAppwriteClient();
    const user = await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // false for dev
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return c.json({ data: user });
})
.post("/logout", sessionMiddleware, async (c) => {
    const { account } = await createAppwriteClient();
    try {
        await account.deleteSession("current");

        deleteCookie(c, AUTH_COOKIE);
        await account.deleteSession("current");
        return c.json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        return c.json({ error: "An unknown error occurred" }, 500);
    }
});

export default app;