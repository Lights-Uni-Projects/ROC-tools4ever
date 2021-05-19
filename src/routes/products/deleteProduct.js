import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ body, context }) {
    if (context.user && (context.user.position.name === "Manager" || context.user.position.name === "Admin")) {
        const productName = body.get("productName");
        const productSerial = body.get("productSerial");
        const productManufacturer = body.get("productManufacturer");
        const productPrice = body.get("productPrice");
        const productMinStock = body.get("productMinStock");


        const getManufacturerID = await db.manufacturer.findMany({
            where: {
                name: productManufacturer
            }
        })

        if (!(getManufacturerID.length)) {
            const addManufacturer = await db.manufacturer.create({
                data: {
                    name: productManufacturer,
                }
            })
        }

        // This is dumb but I don't know a better way, soooooooooooo it stays for now
        // can always fix this later
        const getManufacturerID2 = await db.manufacturer.findMany({
            where: {
                name: productManufacturer
            }
        })


        const productCheck = await db.product.findMany({
            where: {
                AND: [
                    { name: productName },
                    { serial: productSerial },
                    { manufacturer_id: getManufacturerID[0].id }
                ]
            }
        });


        if (productCheck.length) {
            // throw new Error("Product al in database")
            alert("Product al in database")
        }


        const addProduct = await db.product.create({
            data: {
                name: productName,
                serial: productSerial,
                manufacturer_id: getManufacturerID[0].id,
                price: parseInt(productPrice * 100) / 100,
                min_stock: parseInt(productMinStock),
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
    } else {
        console.log(context)
        return {
            status: 307,
            headers: {
                location: "/products",
            }
        };
    }
}