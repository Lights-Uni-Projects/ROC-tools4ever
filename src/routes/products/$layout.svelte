<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ session }) {
		if (session.user) {
            return {}
        };
        return {
            status: 403,
            error: new Error("Not logged in"),
        }
	}
</script>

<div class="container mx-auto">
	<div class="center float m-auto relative">
		<a class="absolute right-20 -top-24" href="/admin/register">Registreer</a><p class="absolute right-16 -top-24"> |</p>
    </div>
</div>

<slot />
