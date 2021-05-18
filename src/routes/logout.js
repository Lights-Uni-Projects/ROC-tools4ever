/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ body }) {
    return {
        status: 307,
        headers: {
            "set-cookie": [
                `id=undefined; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
            ],
            location: "/",
        },
    };
}