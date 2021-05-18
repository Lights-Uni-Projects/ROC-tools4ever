import argon2 from 'argon2';
import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ body }) {
    const username = body.get("username");
    const password = body.get("password");

    const user = await db.user.findUnique({
        where: {
            username: username
        }
    });

    const hash = await argon2.hash(password);

    if (user && argon2.verify(hash, password)) {
        // login the user
        // Not secure by a long shot, but this is just for example
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
}