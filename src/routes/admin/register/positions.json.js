import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ context }) {
    if (context.user) {
        const positions = await db.position.findMany();
        return {
            body: positions,
        };
    }
}