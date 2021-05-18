import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ context }) {
    if (context.user) {
        const products = await db.product.findMany({ orderBy: { name: "asc" } });
        return {
            body: products,
        };
    }
}