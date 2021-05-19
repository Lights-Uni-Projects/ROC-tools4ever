import * as cookie from "cookie";
import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').GetContext}
 */
export async function getContext({ headers }) {
    const cookies = cookie.parse(headers.cookie || "");

    if (cookies) {
        try {
            const user = await db.user.findUnique({
                where: {
                    id: +parseInt(cookies.id)
                },
                include: {
                    position: true
                }
            });
            return { user };
        } catch (e) {
            console.error(e);
            return {};
        }
    }

    return {};
}

/**
 * @type {import('@sveltejs/kit').GetSession}
 */
export function getSession({ context }) {
    return context;
}