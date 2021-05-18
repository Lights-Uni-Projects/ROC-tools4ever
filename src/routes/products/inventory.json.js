import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ context }) {
    if (context.user) {
        const products = await db.inventory.findMany({
            include: {
                warehouse: true,
                product: {
                    include: {
                        manufacturer: true
                    }
                }
            },
            orderBy: [{
                warehouse_id: "asc"
            }]
        });

        return {
            body: products,
        };
    }
}