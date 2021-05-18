<script context="module">
    /**
     * @type {import('@sveltejs/kit').Load}
     */
    export async function load({ session }) {
        if (session.user) {
            return {};
        }
        return {
            status: 403,
            error: new Error("Not logged in"),
            };
        }
</script>

<slot />
