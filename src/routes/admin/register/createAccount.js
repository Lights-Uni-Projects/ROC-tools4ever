import argon2 from 'argon2';
import db from "$lib/database";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function post({ body, context }) {
    if (context.user && (context.user.position.name === "Owner" || context.user.position.name === "Admin")) {
        const username = body.get("username");
        const password = body.get("password");
        const fullname = body.get("fullname");

        let pos_newUser = null;

        if (!(/[0-9]/.test(password) && /[a-z]/i.test(password) && password.length >= 8)) {
            throw new Error("Wachtwoord moet minimaal 1 letter en 1 nummer hebben, en moet minimaal 8 karakters lang zijn")
        }

        pos_newUser = parseInt(body.get("position"));

        const userCheck = await db.user.findUnique({
            where: {
                username: username
            }
        });

        if (userCheck !== null) {
            throw new Error("Gebruikersnaam al in gebruik")
        }

        const hash = await argon2.hash(password);
        const addUser = await db.user.create({
            data: {
                username: username,
                password: hash,
                name: fullname,
                position_id: pos_newUser
            }
        })

        try {
            return {
                status: 307,
                headers: {
                    Location: '/admin/register'
                }
            }
        } catch (error) {
            return {
                status: 307,
                headers: {
                    Location: '/admin/register'
                }
            }
        }
    } else {
        console.log(context)
        return {
            status: 307,
            headers: {
                location: "/admin/register",
            }
        };
    }
}