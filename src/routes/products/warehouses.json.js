import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ context }) {
    if (context.user) {
        const products = await db.warehouse.findMany({ orderBy: { location: "asc" } });
        return {
            body: products,
        };
    }
}