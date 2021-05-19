import argon2 from 'argon2';
import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ body }) {
    const username = body.get("username");

    try {
        const user = await db.user.findUnique({
            where: {
                username: username
            }
        });

        if (await argon2.verify(user.password, body.get("password"))) {
            return {
                status: 307,
                headers: {
                    "set-cookie": [`id=${user.id}; HttpOnly`],
                    location: "/products",
                },
            };
        } else {
            // go back to login page
            return {
                status: 307,
                headers: {
                    location: "/",
                },
            };
        }
    } catch (error) {
        return {
            status: 307,
            headers: {
                location: "/",
            },
        };
    }
}