<script context="module">
    /**
	 * @type {import('@sveltejs/kit').Load}
	 */
    export async function load({ fetch }) {
        const positionResponse = await fetch("/admin/register/positions.json");
        const positions = await positionResponse.json();

        return { props: { positions } };
    }
</script>

<script>
    export let positions = [];
</script>

<form
    method="POST"
    action="/admin/register/createAccount"
    class="mx-auto text-2xl text-center flex flex-col w-80 bg-gray-200 m-4 p-8 rounded-xl"
>
    <h2 class="text-3xl mb-6">Creëer account</h2>
    <input
        class="border border-gray-900 p-1 mb-2"
        type="text"
        placeholder="Gebruikersnaam"
        name="username"
    />
    <input
        class="border border-gray-900 p-1 mb-2"
        type="password"
        placeholder="Wachtwoord"
        name="password"
    />
    <input
        class="border border-gray-900 p-1 mb-2"
        type="text"
        placeholder="Volle naam"
        name="fullname"
    />
    <label
        class="text-center border-gray-900 p-1 mb-2"
    >
        <select
            name="position"
        >
            {#each positions as position (position.id)}
                <option value={position.id}>{position.name}</option>
            {/each}
        </select>
    </label>


    <button type="submit" class="bg-blue-200 hover:bg-blue-300 text-blue-700 py-2">
        Registreer
    </button>
</form>