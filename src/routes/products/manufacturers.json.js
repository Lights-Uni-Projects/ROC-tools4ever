import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ context }) {
    if (context.user) {
        const manufacturers = await db.manufacturer.findMany();
        return {
            body: manufacturers,
        };
    }
}