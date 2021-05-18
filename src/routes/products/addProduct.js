import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ body }) {
    const productToAdd = parseInt(body.get("productToAdd"));
    const warehouse = parseInt(body.get("warehouse"));
    const productTotalOrdered = parseInt(body.get("productTotalOrdered"));


    // const checkCombinationExists = await db.inventory.findMany({
    //     where: {
    //         product_id: productToAdd,
    //         warehouse_id: warehouse,
    //     }
    // })

    // Is it really stupid if it works? :^)
    // if (!(checkCombinationExists.length)) {
    //     const addCombination = await db.inventory.create({
    //         data: {
    //             product_id: productToAdd,
    //             warehouse_id: warehouse,
    //         }
    //     })
    // }

    const addProducts = await db.inventory.upsert({
        where: {
            warehouse_id_product_id: {
                product_id: productToAdd,
                warehouse_id: warehouse,
            }
        },
        update: {
            stock: {
                increment: productTotalOrdered
            }
        },
        create: {
            product_id: productToAdd,
            warehouse_id: warehouse,
            stock: productTotalOrdered,
        }
    })

    try {
        return {
            status: 307,
            headers: {
                Location: '/products'
            }
        }
    } catch (error) {
        return {
            status: 307,
            headers: {
                Location: '/products'
            }
        }
    }
}